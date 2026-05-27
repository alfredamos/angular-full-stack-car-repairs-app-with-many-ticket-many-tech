import {createError, defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../../services/assignedTicket.service";
import {assignedTicketEditSchema} from "../../../../../validations/assignedTicket.validation";
import {adminAuthorization} from "../../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the payload from the request body.
        const ticket = await readValidatedBody(event, assignedTicketEditSchema.parse);

        //----> Get the ticket id from the request parameters.
        const techId = getRouterParam(event, 'techId') as string;
        const ticketId = getRouterParam(event, 'ticketId') as string;

        //----> Edit ticket with the giving tech id and ticket id.
        return await assignedTicketService.editAssignedTicketById(techId, ticketId, ticket);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})