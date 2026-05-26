import {createError, defineEventHandler, readValidatedBody} from "h3";
import {assignedTicketCreateSchema} from "../../../validations/assignedTicket.validation";
import {assignedTicketService} from "../../../services/assignedTicket.service";
import {HttpError} from "http-errors"

export default defineEventHandler(async (event) => {
    try {
        //----> Get the payload from the request body.
        const ticket = await readValidatedBody(event, assignedTicketCreateSchema.parse);

        //----> Insert the ticket into the database.
        return await assignedTicketService.createAssignedTicket(ticket);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})