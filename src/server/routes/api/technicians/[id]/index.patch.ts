import {createError, defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {techService} from "../../../../services/tech.service";
import {technicianEditSchema} from "../../../../validations/technician.validation";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the payload from the request body.
        const technician = await readValidatedBody(event, technicianEditSchema.parse);

        //----> Get the technician id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Edit technician with the giving id.
        return await techService.editTechnicianById(id, technician);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})