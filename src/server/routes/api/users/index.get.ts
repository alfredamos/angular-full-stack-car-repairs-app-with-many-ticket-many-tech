import {HttpError} from "http-errors"
import {createError, defineEventHandler} from "h3";
import {userService} from "../../../services/user.service";
import {adminAuthorization} from "../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Fetch all users.
        return await userService.getAllUsers();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})