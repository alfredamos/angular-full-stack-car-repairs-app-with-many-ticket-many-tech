import {createError, defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../services/ticket.service";
import {ticketCreateSchema} from "../../../validations/ticket.validation";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the ticket payload from the request body.
        const ticket = await readValidatedBody(event, ticketCreateSchema.parse);

        //----> Insert the ticket in db.
        return await ticketService.createTicket(ticket);

    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})