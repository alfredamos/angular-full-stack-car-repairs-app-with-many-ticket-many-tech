import {Status} from "../generated/prisma/enums";

export class AssignedTicketEditInput {
    status: Status = Status.Open;
}