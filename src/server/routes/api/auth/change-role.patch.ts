import {createError, defineEventHandler, readValidatedBody} from "h3";
import {changeUserRoleSchema} from "../../../validations/auth.validation";
import {authService} from "../../../services/auth.service";
import {HttpError} from "http-errors"

export default defineEventHandler(async (event) => {
    try {
        //----> Retrieve the payload from the request body.
        const payload = await readValidatedBody(event, changeUserRoleSchema.parse);

        //----> Change the user role.
        return await authService.changeUserRole(payload, event);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})