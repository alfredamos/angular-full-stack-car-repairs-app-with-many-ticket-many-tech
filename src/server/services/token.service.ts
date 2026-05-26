import { ResponseMessage } from "../utils/responseMessage";
import {ITokenService} from "./IToken.service";
import {prisma} from "../db/prisma.db";
import {StatusCodes} from "http-status-codes";
import {TokenUncheckedCreateInput} from "../../generated/prisma/models/Token";

class TokenService implements ITokenService {
    async createToken(token: TokenUncheckedCreateInput): Promise<void> {
        //----> Insert token into database.
        await prisma.token.create({data: token});
    }

    async deleteAllInvalidTokens(): Promise<ResponseMessage> {
        //----> Delete all invalid tokens.
        await prisma.token.deleteMany({where: {expired: true, revoked: true}});

        //----> Return response message.
        return new ResponseMessage("All invalid tokens deleted successfully.", "success", StatusCodes.OK);
    }

    async deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage> {
        //----> Delete all invalid tokens.
        await prisma.token.deleteMany({where: {userId, expired: true, revoked: true}});

        //----> Return response message.
        return new ResponseMessage("All invalid tokens deleted successfully.", "success", StatusCodes.OK);
    }

    async revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage> {
        //----> Revoke all valid tokens.
        await prisma.token.updateMany({where: {userId, expired: false, revoked: false}, data: {expired: true, revoked: true}});

        //----> Return response message.
        return new ResponseMessage("All valid tokens revoked successfully.", "success", StatusCodes.OK);
    }
}

export const tokenService = new TokenService() as ITokenService;