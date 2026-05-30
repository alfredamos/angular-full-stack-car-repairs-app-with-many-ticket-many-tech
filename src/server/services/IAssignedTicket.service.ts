import {
    type AssignedTicketUncheckedCreateInput,
    type AssignedTicketUncheckedUpdateInput
} from "../../generated/prisma/models/AssignedTicket";
import {AssignedTicketResponse} from "../../models/assignedTicketResponse.model";

export interface IAssignedTicketService {
    changeAssignedTicketStatus(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    createAssignedTicket(request: AssignedTicketUncheckedCreateInput): Promise<AssignedTicketResponse>;
    deleteAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    editAssignedTicketById(techId: string, ticketId: string, request: AssignedTicketUncheckedUpdateInput): Promise<AssignedTicketResponse>;
    getAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse>;
    getAllAssignedTicket(): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByTechId(techId: string): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByTicketId(ticketId: string): Promise<AssignedTicketResponse[]>;
    getAssignedTicketsByUserId(userId: string): Promise<AssignedTicketResponse[]>;
    getCompletedAssignedTicket(): Promise<AssignedTicketResponse[]>;
    getInCompletedAssignedTicket(): Promise<AssignedTicketResponse[]>;
}