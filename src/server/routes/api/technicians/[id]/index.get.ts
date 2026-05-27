import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {techService} from "../../../../services/tech.service";
import {adminAuthorization} from "../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the technician id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Fetch technician with the giving id.
        return await techService.getTechnicianById(id);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})