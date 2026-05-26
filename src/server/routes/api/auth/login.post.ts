import {createError, defineEventHandler, readValidatedBody} from "h3";
import {loginUserSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
    try {
        //----> Retrieve the payload from the request body.
        const payload = await readValidatedBody(event, loginUserSchema.parse);

        //----> Login the user.
        return await authService.loginUser(payload, event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: StatusCodes.INTERNAL_SERVER_ERROR, statusText: error.message});
    }
})