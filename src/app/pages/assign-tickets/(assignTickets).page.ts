import {Component, inject} from "@angular/core";
import {AssignedTicketTable} from "../../components/assigned-ticket-table/assigned-ticket-table";
import {AssignedTicketResponse} from "../../../models/assignedTicketResponse.model";
import {AssignedTicketDb} from "../../services/assigned-ticket-db";
import {AssignedTicketService} from "../../services/assigned-ticket-service";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-assigned-tickets-list-page',
    imports: [AssignedTicketTable],
    template: `
    <app-assigned-ticket-table
        [tickets]="tickets.value() || []" 
        (onChangeTicketStatus)="changeTicketStatus($event)"
    />
  `,
})
export default class AssignTicketsPage {
    tickets = httpResource<AssignedTicketResponse[]>(() => '/api/assign-tickets')

    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);

    async changeTicketStatus(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.changeAssignedTicketStatus(ticketId.techId, ticketId.ticketId);
        this.tickets.set(this.ticketService.tickets());
    }
}