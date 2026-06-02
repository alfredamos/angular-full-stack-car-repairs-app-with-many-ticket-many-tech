import {AssignedTicketUncheckedCreateInput, AssignedTicketUncheckedUpdateInput} from "src/generated/prisma/models";
import {
    AssignedTicketRequest,
    AssignedTicketResponse,
    toAssignedTicketResponse
} from "../../models/assignedTicketResponse.model";
import {IAssignedTicketService} from "./IAssignedTicket.service";
import {prisma} from "../db/prisma.db";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";
import {Status} from "../../generated/prisma/enums";

class AssignedTicketService implements IAssignedTicketService {
    async changeAssignedTicketStatus(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Fetch the ticket with the given techId and ticketId.
        const assignedTicket = await this.getOneAssignedTicket(techId, ticketId);

        //----> Change ticket status.
        const completed = !assignedTicket.completed;
        const status = completed ? Status.Closed : Status.Open;

        //----> Update the changes.
        const updatedAssignedTicket = await prisma.assignedTicket.update({where: {techId_ticketId: {techId, ticketId}}, data: {completed, status}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return toAssignedTicketResponse(updatedAssignedTicket as AssignedTicketRequest);
    }

    async createAssignedTicket(request: AssignedTicketUncheckedCreateInput): Promise<AssignedTicketResponse> {
        //----> Insert the new assigned ticket into database.
        const assignedTicket = await prisma.assignedTicket.create({data: request, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return toAssignedTicketResponse(assignedTicket as AssignedTicketRequest);
    }

    async deleteAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Check for existence of assigned ticket.
        await this.getOneAssignedTicket(techId, ticketId);

        //----> Delete the assigned ticket.
        const deletedAssignedTicket = await prisma.assignedTicket.delete({where: {techId_ticketId: {techId, ticketId}}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return toAssignedTicketResponse(deletedAssignedTicket as AssignedTicketRequest);
    }

    async editAssignedTicketById(techId: string, ticketId: string, request: AssignedTicketUncheckedUpdateInput): Promise<AssignedTicketResponse> {
        //----> Check for existence of assigned ticket.
        await this.getOneAssignedTicket(techId, ticketId);

        request.completed = request.status !== Status.Open;

        //----> Update the assigned ticket.
        const updatedAssignedTicket = await prisma.assignedTicket.update({where: {techId_ticketId: {techId, ticketId}}, data: request, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return toAssignedTicketResponse(updatedAssignedTicket as AssignedTicketRequest);
    }

    async getAssignedTicketById(techId: string, ticketId: string): Promise<AssignedTicketResponse> {
        //----> Fetch assigned ticket by techId and ticketId
        const assignedTicket = await this.getOneAssignedTicket(techId, ticketId);

        //----> Send back response.
        return toAssignedTicketResponse(assignedTicket as AssignedTicketRequest);
    }

    async getAllAssignedTicket(): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return assignedTickets.map(assignedTicket => toAssignedTicketResponse(assignedTicket as AssignedTicketRequest));
    }

    async getAssignedTicketsByTechId(techId: string): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {techId}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return assignedTickets.map(assignedTicket => toAssignedTicketResponse(assignedTicket as AssignedTicketRequest));
    }

    async getAssignedTicketsByTicketId(ticketId: string): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {ticketId}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return assignedTickets.map(assignedTicket => toAssignedTicketResponse(assignedTicket as AssignedTicketRequest));
    }

    async getAssignedTicketsByUserId(userId: string): Promise<AssignedTicketResponse[]> {
        //----> Fetch the tech with the giving user-id.
        const tech = await this.getOneTech(userId);

        //----> Fetch all the tickets assigned to this tech and send back a response.
        return await this.getAssignedTicketsByTechId(tech.id);

    }

    async getCompletedAssignedTicket(): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {completed: true}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return assignedTickets.map(assignedTicket => toAssignedTicketResponse(assignedTicket as AssignedTicketRequest));
    }

    async getInCompletedAssignedTicket(): Promise<AssignedTicketResponse[]> {
        //----> Fetch all assigned tickets.
        const assignedTickets = await prisma.assignedTicket.findMany({where: {completed: false}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Send back response.
        return assignedTickets.map(assignedTicket => toAssignedTicketResponse(assignedTicket as AssignedTicketRequest));
    }

    private async getOneAssignedTicket(techId: string, ticketId){
        //----> Fetch assigned ticket by techId and ticketId
        const assignedTicket = await prisma.assignedTicket.findUnique({where: {techId_ticketId: {techId, ticketId}}, include: {ticket: {include: {customer: {include: {user: true}}}}, tech: {include: {user: true}}}});

        //----> Check for null assigned ticket.
        if(!assignedTicket) throw createError({statusText:"Assigned ticket not found.", statusCode: StatusCodes.NOT_FOUND});

        //----> Return assigned ticket
        return assignedTicket;
    }

    private async getOneTech(userId: string){
        const tech = await prisma.technician.findUnique({where: {userId}});

        //----> Check for null technician.
        if (!tech){
            throw createError({statusCode: StatusCodes.NOT_FOUND, message: "Technician not found in db!"});
        }

        //----> Send back response.
        return tech;
    }
}

export const assignedTicketService = new AssignedTicketService() as IAssignedTicketService;