import {HttpError} from "http-errors"
import {createError, defineEventHandler} from "h3";
import {tokenService} from "../../../../../services/token.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Delete all invalid tokens.
        return await tokenService.deleteAllInvalidTokens();

    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})