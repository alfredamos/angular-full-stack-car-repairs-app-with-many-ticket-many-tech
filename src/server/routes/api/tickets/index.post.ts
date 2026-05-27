import {createError, defineEventHandler, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../services/ticket.service";
import {ticketCreateSchema} from "../../../validations/ticket.validation";
import {adminAuthorization} from "../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the ticket payload from the request body.
        const ticket = await readValidatedBody(event, ticketCreateSchema.parse);

        //----> Insert the ticket in db.
        return await ticketService.createTicket(ticket);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})