import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../../services/ticket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Fetch ticket with the giving id.
        return await ticketService.getTicketById(id);

    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})