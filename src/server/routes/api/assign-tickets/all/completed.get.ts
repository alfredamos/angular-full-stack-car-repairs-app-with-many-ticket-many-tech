import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../services/assignedTicket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Fetch completed tickets.
        return await assignedTicketService.getCompletedAssignedTicket();
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})