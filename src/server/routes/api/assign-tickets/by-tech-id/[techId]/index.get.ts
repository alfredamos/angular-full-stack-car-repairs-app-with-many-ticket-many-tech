import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../../services/assignedTicket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket id from the request parameters.
        const techId = getRouterParam(event, 'techId') as string;

        //----> Fetch all tickets assigned to the tech with the given id.
        return await assignedTicketService.getAssignedTicketsByTechId(techId);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})