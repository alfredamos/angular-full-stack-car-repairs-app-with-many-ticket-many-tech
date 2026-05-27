import {HttpError} from "http-errors"
import {createError, defineEventHandler} from "h3";
import {tokenService} from "../../../../../services/token.service";
import {adminAuthorization} from "../../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Delete all invalid tokens.
        return await tokenService.deleteAllInvalidTokens();

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})