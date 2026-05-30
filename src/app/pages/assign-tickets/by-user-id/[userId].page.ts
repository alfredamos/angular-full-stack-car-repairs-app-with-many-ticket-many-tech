import {Component, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {CustomerResponse} from "../../../../models/customerResp.model";
import {AssignedTicketResponse} from "../../../../models/assignedTicketResponse.model";
import {TechnicianResponse} from "../../../../models/technicianResp.model";
import {AssignedTicketTable} from "../../../components/assigned-ticket-table/assigned-ticket-table";
import {TechDb} from "../../../services/tech-db";
import {TechService} from "../../../services/tech-service";
import {AssignedTicketDb} from "../../../services/assigned-ticket-db";
import {AssignedTicketService} from "../../../services/assigned-ticket-service";

@Component({
    selector: 'app-assigned-ticket-by-user-id',
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
export default class AssignedTicketByUserId{
    userId = input.required<string>();

    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);

    tech = httpResource<TechnicianResponse>(() => `/api/technicians/by-user-id/${this.userId()}`);

    tickets = httpResource<AssignedTicketResponse[]>(() => `/api/assign-tickets/by-tech-id/${this.tech.value()?.id}`);

    async changeTicketStatus(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.changeAssignedTicketStatus(ticketId.techId, ticketId.ticketId);
        this.tickets.set(this.ticketService.tickets());
    }
}