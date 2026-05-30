import { TicketUncheckedCreateInput, TicketUncheckedUpdateInput } from "src/generated/prisma/models";
import {ITicketService} from "./ITicket.service";
import {prisma} from "../db/prisma.db";
import {TicketWithCustomer} from "../../models/ticketWithCustomer";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";
import {TicketResponse, toTicketResponse} from "../../models/ticketResponse.model";

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

    async getTicketByUserId(userId: string): Promise<TicketResponse[]> {
        //----> Fetch the customer associated with the giving user-id.
        const customer = await this.getOneCustomer(userId);

        //----> fetch all tickets associated with the customer.
        return await this.getTicketByCustomerId(customer.id);
    }

    private async getOneTicket(id: string) {
        //----> Fetch ticket by id.
        const ticket = await prisma.ticket.findUnique({where: {id}, include: {customer: {include: {user: true}}}});

        //----> Check for null ticket.
        if (!ticket) throw createError({statusText: "Ticket not found in db!", statusCode: StatusCodes.NOT_FOUND});

        //----> Send back response.
        return ticket;
    }

    private async getOneCustomer(userId: string) {
        //----> Get the customer associated with the giving user-id.
        const customer = await prisma.customer.findUnique({where: {userId}});

        //----> Check for null customer.
        if (!customer) throw createError({statusText: "Customer not found in db!", statusCode: StatusCodes.NOT_FOUND});

        //----> Send back response.
        return customer;
    }

}

export const ticketService = new TicketService() as ITicketService;