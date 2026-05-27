import {createError, defineEventHandler} from "h3";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"

export default defineEventHandler(async (event) => {
    try {
        //----> Logout the user.
        return await authService.logoutUser(event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})