import {HttpError} from "http-errors"
import {createError, defineEventHandler, getRouterParam} from "h3";
import {userService} from "../../../../services/user.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Fetch the user with the giving id.
        return await userService.getUserById(id);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})