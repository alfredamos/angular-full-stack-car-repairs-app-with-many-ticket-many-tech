import {createError, getCookie, H3Event, setCookie} from "h3";
import {fromUserToUserDto, UserDto} from "../../models/userDto.model";
import {UserSession} from "../../models/UserSession.model";
import {ResponseMessage} from "../utils/responseMessage";
import {
    ChangeUserPassword,
    ChangeUserRole,
    EditUserProfile,
    LoginUser,
    SignupUser
} from "../validations/auth.validation";
import {IAuthService} from "./IAuth.service";
import {prisma} from "../db/prisma.db";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {TokenJwt} from "../../models/tokenJwt.model";
import {JwtPayload} from "../../models/jwtPayload.model";
import {Role, TokenType} from "../../generated/prisma/enums";
import {User} from "../../generated/prisma/client";
import {TokenUncheckedCreateInput} from "../../generated/prisma/models/Token";
import {emptyJwtPayload} from "../utils/emptyJwtPayload";
import {CookieParam} from "../utils/cookieParam.util";
import {emptyUserSession} from "../utils/emptyUserSession";
import {fromEditUserToUser} from "../utils/fromEditUserProfileToUser";
import {tokenService} from "./token.service";
import {fromSignupUserToUser} from "../utils/fromSignupUserToUser";

export class AuthService implements IAuthService {
    async changeUserPassword(changeUserPassword: ChangeUserPassword): Promise<ResponseMessage> {
        //----> Check for password match.
        if (this.passwordNotMatch(changeUserPassword.newPassword, changeUserPassword.confirmPassword)){
            throw createError({statusCode: StatusCodes.BAD_REQUEST, statusMessage: "Passwords do not match"});
        }

        //----> Check for existence of user.
        const user = await this.getUserByEmail(changeUserPassword.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(changeUserPassword.password, user.password)){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid password"});
        }

        //----> Hash new password.
        const hashedPassword = await this.hashPassword(changeUserPassword.newPassword);

        //----> Update the user info in db.
        await prisma.user.update({where: {email: changeUserPassword.email}, data: {...user, password: hashedPassword}});

        //----> Send back response.
        return new ResponseMessage("Password changed successfully", "success", StatusCodes.OK);
    }

    async changeUserRole(changeUserRole: ChangeUserRole, event: H3Event): Promise<UserDto> {
        //----> Get user-session.
        const session = this.getUserSession(event);

        //----> Must an admin to change role.
        if (!session.isAdmin){
            throw createError({statusCode: StatusCodes.FORBIDDEN, statusMessage: "You are not permitted to change role"});
        }

        //----> Check for existence of user.
        const user = await this.getUserByEmail(changeUserRole.email);

        //----> Change user role.
        const role = user.role === Role.Admin ? Role.User : Role.Admin;

        //----> Update the user info in db.
        const updatedUser = await prisma.user.update({where: {email: user.email}, data: {...user, role}});

        //----> Send back response.
        return fromUserToUserDto(updatedUser);
    }

    async editUserProfile(editUserProfile: EditUserProfile): Promise<ResponseMessage> {
        //----> Check for existence of user.
        const user = await this.getUserByEmail(editUserProfile.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(editUserProfile.password, user.password)){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid password"});
        }

        //----> Map edit-user-profile to user.
        editUserProfile.password = user.password;
        const userToEdit = fromEditUserToUser(editUserProfile, user.id);

        //----> Update the user details in db.
        await prisma.user.update({where: {email: editUserProfile.email}, data: userToEdit});

        //----> Send back response.
        return new ResponseMessage("Profile updated successfully", "success", StatusCodes.OK);
    }

    async getCurrentUser(event: H3Event): Promise<UserDto> {
        //----> Get the user-session.
        const session = this.getUserSession(event);

        //----> Check for null session.
        if (!session){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "You must login!"});
        }

        //----> Get the current user.
        const user = await this.getUserByEmail(session.email);

        //----> Send back response.
        return fromUserToUserDto(user)
    }

    getUserSession(event: H3Event): UserSession {
        //----> Get the access-token.
        const accessToken = this.fetchCookie(CookieParam.accessTokenName, event);

        //----> Check for null access-token.
        if (!accessToken){
            return emptyUserSession;
        }

        //----> Validate token.
        const payload = this.validateUserToken(accessToken);

        //----> Check for null payload.
        if (!payload){
            return emptyUserSession;
        }

        //----> Map JwtPayload to TokenJwt.
        const tokenJwt = this.makeTokenJwtFromJwtPayload(payload);

        //----> Make user-session and send it back.
        return this.makeUserSession(tokenJwt, accessToken);
    }

    async loginUser(loginUser: LoginUser, event: H3Event): Promise<UserSession> {
        //----> Check for existence of user.
        const user = await this.getUserByEmail(loginUser.email);

        //----> Check for valid password.
        if (await this.passwordNotValid(loginUser.password, user.password)){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid password"});
        }

        //----> Map user to tokenJwt.
        const tokenJwt = this.makeTokenJwtFromUser(user);

        //----> Generate tokens and store in cookies.
        return await this.generateTokensAndStoreInCookies(tokenJwt, event);

    }

    async logoutUser(event: H3Event): Promise<UserSession> {
        //----> Delete all cookies.
        this.deleteCookie(CookieParam.accessTokenName, CookieParam.accessTokenPath, event);
        this.deleteCookie(CookieParam.refreshTokenName, CookieParam.refreshTokenPath, event);

        //----> Get user-session.
        const session = this.getUserSession(event);

        //----> Check for null session.
        if (!session.isLoggedIn){
            return emptyUserSession;
        }

        //----> Revoke all valid tokens.
        await tokenService.revokeAllValidTokensByUserId(session.id);

        //----> Send back response.
        return emptyUserSession;
    }

    async refreshUserToken(event: H3Event): Promise<UserSession> {
        //----> Get the refresh-token.
        const refreshToken = this.fetchCookie(CookieParam.refreshTokenName, event);

        //----> Check for null refresh-token.
        if (!refreshToken){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Refresh token not found"});
        }

        //----> Validate refresh-token.
        const jwtPayload = this.validateUserToken(refreshToken);

        //----> Map JwtPayload to TokenJwt.
        const tokenJwt = this.makeTokenJwtFromJwtPayload(jwtPayload);

        //----> Generate tokens and store in cookies.
        return await this.generateTokensAndStoreInCookies(tokenJwt, event);
    }

    async signupUser(signupUser: SignupUser): Promise<ResponseMessage> {
        //----> Check for password match.
        if (this.passwordNotMatch(signupUser.password, signupUser.confirmPassword)){
            throw createError({statusCode: StatusCodes.BAD_REQUEST, statusMessage: "Passwords do not match"});
        }

        //----> Check for existence of user.
        const user = await prisma.user.findUnique({where: {email: signupUser.email}});
        if (user){
            throw createError({statusCode: StatusCodes.UNAUTHORIZED, statusMessage: "Invalid credentials!"});
        }

        //----> Hash the password.
        signupUser.password = await this.hashPassword(signupUser.password);

        //----> Map signup-user to user.
        const userToCreate = fromSignupUserToUser(signupUser);

        //----> Insert the new user in user db.
        await prisma.user.create({data: userToCreate});

        //----> Send back response.
        return new ResponseMessage("Signup is successful", "success", StatusCodes.CREATED);
    }

    private async generateTokensAndStoreInCookies(tokenJwt: TokenJwt, event: H3Event){
        //----> Revoke all valid tokens.
        await tokenService.revokeAllValidTokensByUserId(tokenJwt.id);

        //----> Generate access-token and store it in cookie.
        const accessToken = await this.generateToken(tokenJwt, CookieParam.accessTokenExpiresIn);
        this.makeCookie(CookieParam.accessTokenName, accessToken, CookieParam.accessTokenPath, CookieParam.accessTokenExpiresIn, event);

        //----> Generate refresh-token and store it in cookie.
        const refreshToken = await this.generateToken(tokenJwt, CookieParam.refreshTokenExpiresIn);
        this.makeCookie(CookieParam.refreshTokenName, refreshToken, CookieParam.refreshTokenPath, CookieParam.refreshTokenExpiresIn, event);

        //----> Make token-object.
        const tokenObject = this.makeTokenObject(accessToken, refreshToken, tokenJwt.id);

        //----> Insert the new token object in token-db.
        await tokenService.createToken(tokenObject);

        //----> Make user-session and send it back.
        return this.makeUserSession(tokenJwt, accessToken);

    }

    private async getUserByEmail(email: string) {
        //----> Fetch user by email
        const user = await prisma.user.findUnique({where: {email}});

        //----> If user not found
        if(!user){
            throw createError({statusCode: StatusCodes.NOT_FOUND, statusMessage: "User not found"});
        }

        //----> Return user
        return user;
    }

    private passwordNotMatch(passwordOne: string, passwordTwo: string) {
        return passwordOne.normalize() !== passwordTwo.normalize();
    }

    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 12);
    }

    private async passwordNotValid(rawPassword: string, encodedPassword: string) {
        return !(await bcrypt.compare(rawPassword, encodedPassword));
    }

    private async generateToken(tokenJwt: TokenJwt, expiresIn: number){
        return jwt.sign(tokenJwt, process.env['JWT_TOKEN_KEY'] as string, {expiresIn});
    }

    private validateUserToken(token: string): JwtPayload{
        //----> Check for null token.
        if (!token){
            return emptyJwtPayload;
        }

        //----> Validate user token.
        const jwtPayload = jwt.verify(token, process.env['JWT_TOKEN_KEY'] as string) as JwtPayload;

        //----> Check for null jwtPayload or expired jwt.
        if (!jwtPayload || jwtPayload.expiration < Date.now()){
            return emptyJwtPayload;
        }

        //----> Send back response.
        return jwtPayload;
    }

    private makeCookie(cookieName: string, cookieValue: string, cookiePath: string, maxAge: number, event: H3Event){
        setCookie(event, cookieName, cookieValue, {
            httpOnly: true,
            path: cookiePath,
            sameSite: 'strict',
            secure: process.env['NODE_ENV'] === "production",
            maxAge
        });
    }

    private fetchCookie(cookieName: string, event: H3Event){
        //----> Retrieve the cookie from the request.
        const cookie = getCookie(event, cookieName);

        //----> Check for null cookie.
        if (!cookie) return null;

        //----> Send back result.
        return cookie;

    }

    private deleteCookie(cookieName: string, cookiePath: string, event: H3Event){
        this.makeCookie(cookieName, "", cookiePath, 0, event);
    }

    private makeTokenJwtFromUser(user: User): TokenJwt{
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            userType: user.userType,
        }
    }

    private makeTokenJwtFromJwtPayload(payload: JwtPayload): TokenJwt {
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            userType: payload.userType
        }
    }

    private makeUserSession(tokenJwt: TokenJwt, accessToken: string): UserSession{
        return {
            ...tokenJwt,
            accessToken,
            isLoggedIn: !!tokenJwt,
            isAdmin: tokenJwt.role === Role.Admin
        }
    }

    private makeTokenObject(accessToken: string, refreshToken: string, userId: string): TokenUncheckedCreateInput {
        return {
            accessToken,
            refreshToken,
            tokenType: TokenType.Bearer,
            expired: false,
            revoked: false,
            userId
        }
    }

}

export const authService = new AuthService() as IAuthService;