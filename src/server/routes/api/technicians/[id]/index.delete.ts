import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {techService} from "../../../../services/tech.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the technician id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Delete technician with the giving id.
        return await techService.deleteTechnicianById(id);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})