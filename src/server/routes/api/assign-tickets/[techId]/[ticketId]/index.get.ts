import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../../services/assignedTicket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket id from the request parameters.
        const techId = getRouterParam(event, 'techId') as string;
        const ticketId = getRouterParam(event, 'ticketId') as string;

        //----> Fetch ticket with the giving tech id and ticket id.
        return await assignedTicketService.getAssignedTicketById(techId, ticketId);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})