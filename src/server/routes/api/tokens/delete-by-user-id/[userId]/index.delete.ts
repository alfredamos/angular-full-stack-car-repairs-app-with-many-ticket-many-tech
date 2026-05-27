import {HttpError} from "http-errors"
import {createError, defineEventHandler, getRouterParam} from "h3";
import {tokenService} from "../../../../../services/token.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user id from the request parameters.
        const userId = getRouterParam(event, 'userId') as string;

        //----> Delete invalid tokens with the giving user id.
        return await tokenService.deleteInvalidTokensByUserId(userId);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})