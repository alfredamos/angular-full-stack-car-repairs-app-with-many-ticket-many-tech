import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {assignedTicketService} from "../../../../../services/assignedTicket.service";
import {ownerOrAdminById} from "../../../../../utils/ownerOrAdminById";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user-id from router params.
        const userId = getRouterParam(event, 'userId') as string;

        //----> Check for ownership or admin role.
        ownerOrAdminById(event, userId);

        //----> Fetch all tickets assigned to the user with the given id.
        return await assignedTicketService.getAssignedTicketsByUserId(userId);

    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})