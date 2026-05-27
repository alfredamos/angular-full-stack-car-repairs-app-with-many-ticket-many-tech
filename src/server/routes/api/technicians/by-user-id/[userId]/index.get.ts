import {HttpError} from "http-errors"
import {techService} from "../../../../../services/tech.service";
import {createError, defineEventHandler, getRouterParam} from "h3";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the technician user id from the request parameters.
        const userId = getRouterParam(event, 'userId') as string;

        //----> Fetch technician by user id.
        return await techService.getTechnicianByUserId(userId);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})