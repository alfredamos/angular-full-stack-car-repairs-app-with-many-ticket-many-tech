import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {ticketService} from "../../../services/ticket.service";

export default defineEventHandler(async (_event) => {
    try {
        //----> Fetch all tickets.
        return await ticketService.getAllTickets();

    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})