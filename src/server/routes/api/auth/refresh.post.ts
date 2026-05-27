import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"

export default defineEventHandler(async (event) => {
    try {
        //----> Refresh the user token.
        return await authService.refreshUserToken(event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})