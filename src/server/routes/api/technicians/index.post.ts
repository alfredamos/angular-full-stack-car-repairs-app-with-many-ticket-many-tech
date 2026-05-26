import {createError, defineEventHandler, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {technicianCreateSchema} from "../../../validations/technician.validation";
import {techService} from "../../../services/tech.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the payload from the request body.
        const technician = await readValidatedBody(event, technicianCreateSchema.parse);

        //----> Edit technician with the giving id.
        return await techService.createTechnician(technician);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})