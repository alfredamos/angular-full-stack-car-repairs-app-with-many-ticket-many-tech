import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the current user.
        return await authService.getCurrentUser(event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, statusText: error?.message});
    }
})