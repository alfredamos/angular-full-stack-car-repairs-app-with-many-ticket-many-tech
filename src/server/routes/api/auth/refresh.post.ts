import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
    try {
        //----> Refresh the user token.
        return await authService.refreshUserToken(event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: StatusCodes.INTERNAL_SERVER_ERROR, statusText: error.message});
    }
})