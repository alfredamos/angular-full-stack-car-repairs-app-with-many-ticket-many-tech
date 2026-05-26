import { TicketUncheckedCreateInput, TicketUncheckedUpdateInput } from "src/generated/prisma/models";
import {TicketResponse, toTicketResponse} from "src/models/ticketResponse.model";
import {ITicketService} from "./ITicket.service";
import {prisma} from "../db/prisma.db";
import {TicketWithCustomer} from "../../models/ticketWithCustomer";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";

class TicketService implements ITicketService {
    async createTicket(request: TicketUncheckedCreateInput): Promise<TicketResponse> {
        //----> Insert the new ticket in db.
        const ticket = await prisma.ticket.create({data: request, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return toTicketResponse(ticket as TicketWithCustomer);
    }

    async deleteTicketById(id: string): Promise<TicketResponse> {
        //----> Check for existence of ticket.
        await this.getOneTicket(id);

        //----> Delete the ticket.
        const deletedTicket = await prisma.ticket.delete({where: {id}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return toTicketResponse(deletedTicket as TicketWithCustomer);
    }

    async editTicketById(id: string, request: TicketUncheckedUpdateInput): Promise<TicketResponse> {
        //----> Check for existence of ticket.
        await this.getOneTicket(id);

        //----> Update the ticket.
        const updatedTicket = await prisma.ticket.update({
            where: {id},
            data: request,
            include: {customer: {include: {user: true}}}
        });

        //----> Send back response.
        return toTicketResponse(updatedTicket as TicketWithCustomer);
    }

    async getAllTickets(): Promise<TicketResponse[]> {
        //----> Fetch all tickets.
        const tickets = await prisma.ticket.findMany({include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return tickets.map(ticket => toTicketResponse(ticket as TicketWithCustomer));
    }

    async getTicketById(id: string): Promise<TicketResponse> {
        //----> Fetch ticket by id.
        const ticket = await this.getOneTicket(id);

        //----> Send back response.
        return toTicketResponse(ticket as TicketWithCustomer);
    }

    async getTicketByCustomerId(customerId: string): Promise<TicketResponse[]> {
        //----> Fetch ticket by customer id.
        const ticket = await prisma.ticket.findMany({where: {customerId}, include: {customer: {include: {user: true}}}});

        //----> Send back response.
        return ticket.map(ticket => toTicketResponse(ticket as TicketWithCustomer));
    }

    private async getOneTicket(id: string) {
        //----> Fetch ticket by id.
        const ticket = await prisma.ticket.findUnique({where: {id}, include: {customer: {include: {user: true}}}});

        //----> Check for null ticket.
        if (!ticket) throw createError({statusText: "Ticket not found in db!", statusCode: StatusCodes.NOT_FOUND});

        //----> Send back response.
        return ticket;
    }



}

export const ticketService = new TicketService() as ITicketService;