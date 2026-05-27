import {HttpError} from "http-errors"
import {createError, defineEventHandler} from "h3";
import {userService} from "../../../services/user.service";

export default defineEventHandler(async (_event) => {
    try {
        //----> Fetch all users.
        return await userService.getAllUsers();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})