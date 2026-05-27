import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../../services/assignedTicket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket id from the request parameters.
        const ticketId = getRouterParam(event, 'techId') as string;

        //----> Fetch all tickets with the given ticket id.
        return await assignedTicketService.getAssignedTicketsByTicketId(ticketId);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})