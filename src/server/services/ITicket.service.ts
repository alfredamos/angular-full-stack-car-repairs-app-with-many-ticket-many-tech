import {type TicketUncheckedCreateInput, type TicketUncheckedUpdateInput} from "../../generated/prisma/models/Ticket";
import {TicketResponse} from "../../models/ticketResponse.model";

export interface ITicketService {
    createTicket(request: TicketUncheckedCreateInput): Promise<TicketResponse>;
    deleteTicketById(id: string): Promise<TicketResponse>;
    editTicketById(id: string, request: TicketUncheckedUpdateInput): Promise<TicketResponse>;
    getAllTickets(): Promise<TicketResponse[]>;
    getTicketById(id: string): Promise<TicketResponse>;
    getTicketByCustomerId(customerId: string): Promise<TicketResponse[]>;
    getTicketByUserId(userId: string): Promise<TicketResponse[]>;
}