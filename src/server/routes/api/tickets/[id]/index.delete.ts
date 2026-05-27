import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../../services/ticket.service";
import {adminAuthorization} from "../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the ticket id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Delete ticket with the giving id.
        return await ticketService.deleteTicketById(id);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})