import {createError, defineEventHandler, readValidatedBody} from "h3";
import {editProfileUserSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"
import {StatusCodes} from "http-status-codes";

export default defineEventHandler(async (event) => {
    try {
        //----> Retrieve the payload from the request body.
        const payload = await readValidatedBody(event, editProfileUserSchema.parse);

        //----> Edit the user profile.
        return await authService.editUserProfile(payload);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, statusText: error?.message});
    }
})