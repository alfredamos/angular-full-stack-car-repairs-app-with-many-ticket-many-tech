import {createError, defineEventHandler} from "h3";
import {assignedTicketService} from "../../../services/assignedTicket.service";
import {HttpError} from "http-errors"
import {adminAuthorization} from "../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Fetch all tickets.
        return await assignedTicketService.getAllAssignedTicket();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})