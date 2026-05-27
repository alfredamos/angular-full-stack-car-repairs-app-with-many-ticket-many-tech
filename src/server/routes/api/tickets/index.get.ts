import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../services/ticket.service";
import {adminAuthorization} from "../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Fetch all tickets.
        return await ticketService.getAllTickets();

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})