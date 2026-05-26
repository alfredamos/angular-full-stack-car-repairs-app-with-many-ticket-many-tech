import {HttpError} from "http-errors"
import {createError, defineEventHandler, getRouterParam} from "h3";
import {userService} from "../../../../services/user.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user by id.
        const id = getRouterParam(event, 'id') as string;

        //----> Delete the user with the giving id.
        return await userService.deleteUserById(id);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})