import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
    try {
        //----> Logout the user.
        return await authService.logoutUser(event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: StatusCodes.INTERNAL_SERVER_ERROR, statusText: error.message});
    }
})