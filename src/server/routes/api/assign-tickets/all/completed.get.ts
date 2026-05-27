import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../services/assignedTicket.service";
import {adminAuthorization} from "../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Fetch completed tickets.
        return await assignedTicketService.getCompletedAssignedTicket();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})