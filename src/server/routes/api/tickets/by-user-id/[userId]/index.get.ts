import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../../../services/ticket.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user-id from route params.
        const userId = getRouterParam(event, 'userId') as string;

        //----> Fetch all tickets associated with the customer with the giving user-id.
        return await ticketService.getTicketByUserId(userId);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})