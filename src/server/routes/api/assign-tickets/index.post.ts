import {createError, defineEventHandler, readBody} from "h3";
import {assignedTicketCreateSchema} from "../../../validations/assignedTicket.validation";
import {assignedTicketService} from "../../../services/assignedTicket.service";
import {HttpError} from "http-errors"
import {authService} from "../../../services/auth.service";
import {AssignedTicketUncheckedCreateInput} from "../../../../generated/prisma/models/AssignedTicket";
import {validateWithZodSchema} from "../../../validations/zodShema.validation";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user session from the request.
        const session = authService.getUserSession(event);

        //----> Get the payload from the request body.
        const data = await readBody(event) as unknown as AssignedTicketUncheckedCreateInput;
        data.assignBy = session.name;
        const ticket =  validateWithZodSchema(assignedTicketCreateSchema, data)

        //----> Insert the ticket into the database.
        return await assignedTicketService.createAssignedTicket(ticket);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})