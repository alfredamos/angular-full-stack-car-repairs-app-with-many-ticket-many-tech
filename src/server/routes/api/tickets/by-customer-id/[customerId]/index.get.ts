import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../../../services/ticket.service";



export default defineEventHandler(async (event) => {
    try {
        //----> Get the customer id from the request parameters.
        const customerId = getRouterParam(event, 'customerId') as string;

        //----> Fetch tickets with the giving customer id.
        return await ticketService.getTicketByCustomerId(customerId);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})