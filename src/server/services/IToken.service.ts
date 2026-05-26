import {TokenUncheckedCreateInput} from "../../generated/prisma/models/Token";
import {ResponseMessage} from "../utils/responseMessage";

export interface ITokenService {
    createToken(token: TokenUncheckedCreateInput): Promise<void>;
    deleteAllInvalidTokens(): Promise<ResponseMessage>;
    deleteInvalidTokensByUserId(userId: string): Promise<ResponseMessage>;
    revokeAllValidTokensByUserId(userId: string): Promise<ResponseMessage>;
}