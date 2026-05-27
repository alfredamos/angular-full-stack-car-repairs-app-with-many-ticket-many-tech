import {createError, defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../../services/ticket.service";
import {ticketEditSchema} from "../../../../validations/ticket.validation";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket data from the request body.
        const ticket = await readValidatedBody(event, ticketEditSchema.parse);

        //----> Get the ticket id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Edit ticket with the giving id.
        return await ticketService.editTicketById(id, ticket);

    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, message: error?.message})
    }
})