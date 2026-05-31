import {Component, inject, signal} from "@angular/core";
import {AssignedTicketTable} from "../../../components/assigned-ticket-table/assigned-ticket-table";
import {AssignedTicketResponse} from "../../../../models/assignedTicketResponse.model";
import {AssignedTicketDb} from "../../../services/assigned-ticket-db";
import {AssignedTicketService} from "../../../services/assigned-ticket-service";
import {httpResource} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-incompleted-assigned-ticket-page',
    imports: [AssignedTicketTable],
    template: `
        <app-assigned-ticket-table
                [tickets]="tickets.value()"
                (onChangeTicketStatus)="changeTicketStatus($event)"
        />
    `,
})
export default class IncompletedAssignedTicketPage {
    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);
    router = inject(Router);

    tickets = httpResource(() => '/api/assign-tickets/all/incompleted',{
        defaultValue: [],
        parse: (value) => {
            const tickets = value as AssignedTicketResponse[];
            this.ticketService.updateTickets(tickets);
            return tickets;
        }
    })

    async changeTicketStatus(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.changeAssignedTicketStatus(ticketId.techId, ticketId.ticketId);
        this.tickets.set(this.ticketService.tickets());
        await this.router.navigate(['/assign-tickets/all/completed'])
    }
}