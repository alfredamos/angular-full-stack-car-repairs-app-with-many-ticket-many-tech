import {
    ChangeUserPassword,
    ChangeUserRole,
    EditUserProfile,
    LoginUser,
    SignupUser
} from "../validations/auth.validation"
import {ResponseMessage} from "../utils/responseMessage";
import {UserSession} from "../../models/UserSession.model"
import {UserDto} from "../../models/userDto.model"
import {H3Event} from "h3";

export interface IAuthService {
    changeUserPassword(changeUserPassword: ChangeUserPassword): Promise<ResponseMessage>;
    changeUserRole(changeUserRole: ChangeUserRole, event: H3Event): Promise<UserDto>;
    editUserProfile(editUserProfile: EditUserProfile): Promise<ResponseMessage>;
    getCurrentUser(event: H3Event): Promise<UserDto>;
    getUserSession(event: H3Event): UserSession;
    loginUser(loginUser: LoginUser, event: H3Event): Promise<UserSession>;
    logoutUser(event: H3Event): Promise<UserSession>
    refreshUserToken(event: H3Event): Promise<UserSession>;
    signupUser(signupUser: SignupUser): Promise<UserDto>;
}