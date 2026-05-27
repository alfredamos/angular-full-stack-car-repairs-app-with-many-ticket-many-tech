import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {techService} from "../../../services/tech.service";
import {adminAuthorization} from "../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Fetch all technicians.
        return await techService.getAllTechnicians();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, statusText: error?.message});
    }
})