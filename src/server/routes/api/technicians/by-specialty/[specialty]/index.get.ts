import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {techService} from "../../../../../services/tech.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the technician specialty from the request parameters.
        const specialty = getRouterParam(event, 'specialty') as string;

        //----> Fetch technicians by specialty.
        return await techService.getTechnicianBySpecialty(specialty);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})