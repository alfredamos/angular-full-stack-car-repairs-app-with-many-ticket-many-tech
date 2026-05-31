import {Component, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {AssignedTicketResponse} from "../../../../models/assignedTicketResponse.model";
import {AssignedTicketTable} from "../../../components/assigned-ticket-table/assigned-ticket-table";
import {AssignedTicketDb} from "../../../services/assigned-ticket-db";
import {AssignedTicketService} from "../../../services/assigned-ticket-service";

@Component({
    selector: 'app-assigned-ticket-by-user-id',
    imports: [
        AssignedTicketTable
    ],
    template: `
        <app-assigned-ticket-table
                [tickets]="tickets.value()"
                (onChangeTicketStatus)="changeTicketStatus($event)"
        />
    `
})
export default class AssignedTicketByUserId{
    userId = input.required<string>();

    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);

    tickets = httpResource(() => `/api/assign-tickets/by-user-id/${this.userId()}`,{
        defaultValue: [],
        parse: (value) => {
            const tickets = value as AssignedTicketResponse[];
            this.ticketService.updateTickets(tickets);
            return tickets;
        }
    });

    async changeTicketStatus(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.changeAssignedTicketStatus(ticketId.techId, ticketId.ticketId);
        this.tickets.set(this.ticketService.tickets());
    }
}