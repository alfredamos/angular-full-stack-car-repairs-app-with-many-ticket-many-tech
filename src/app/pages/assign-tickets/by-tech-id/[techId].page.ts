import {Component, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {AssignedTicketResponse} from "../../../../models/assignedTicketResponse.model";
import {AssignedTicketDb} from "../../../services/assigned-ticket-db";
import {AssignedTicketService} from "../../../services/assigned-ticket-service";
import {AssignedTicketTable} from "../../../components/assigned-ticket-table/assigned-ticket-table";

@Component({
    selector: 'app-assigned-tickets-by-tech-id-page',
    imports: [
        AssignedTicketTable
    ],
    template: `
        <app-assigned-ticket-table
                [tickets]="tickets.value() || []"
                (onChangeTicketStatus)="changeTicketStatus($event)"
        />
    `
})
export default class AssignedTicketsByTechIdPage {
    techId = input.required<string>();
    tickets = httpResource<AssignedTicketResponse[]>(() => `/api/assign-tickets/by-tech-id/${this.techId()}`)

    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);

    async changeTicketStatus(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.changeAssignedTicketStatus(ticketId.techId, ticketId.ticketId);
        this.tickets.set(this.ticketService.tickets());
    }
}