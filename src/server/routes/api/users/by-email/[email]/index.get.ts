import {HttpError} from "http-errors"
import {createError, defineEventHandler, getRouterParam} from "h3";
import {userService} from "../../../../../services/user.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user email from the request parameters.
        const email = getRouterParam(event, 'email') as string;

        //----> Fetch the user with the giving id.
        return await userService.getUserById(email);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})