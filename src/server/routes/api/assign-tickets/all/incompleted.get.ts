import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../services/assignedTicket.service";

export default defineEventHandler(async (_event) => {
    try {
        //----> Fetch incompleted tickets.
        return await assignedTicketService.getInCompletedAssignedTicket();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})