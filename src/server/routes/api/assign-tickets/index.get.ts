import {createError, defineEventHandler} from "h3";
import {assignedTicketService} from "../../../services/assignedTicket.service";
import {HttpError} from "http-errors"

export default defineEventHandler(async (_event) => {
    try {
        //----> Fetch all tickets.
        return await assignedTicketService.getAllAssignedTicket();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})