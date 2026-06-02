import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from "@angular/core";
import {AssignedTicketEdit} from "../../../../components/assigned-ticket-edit/assigned-ticket-edit";
import {AssignedTicketEdit as Ticket} from "../../../../../server/validations/assignedTicket.validation";
import {AssignedTicketEditInput} from "../../../../../models/AssignedTicketEditInput";
import {AssignedTicketDb} from "../../../../services/assigned-ticket-db";
import {httpResource} from "@angular/common/http";
import {AssignedTicketResponse} from "../../../../../models/assignedTicketResponse.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-assigned-ticket-edit-page',
    imports: [AssignedTicketEdit],
    template: `
        <app-assigned-ticket-edit
            [ticket]="ticketEditInput()"  
            (onBackToList)="backToList()"
            (onTicketEdit)="submitTicketEditForm($event)"
        />
    `
})
export default class AssignedTicketEditPage{
    techId = input.required<string>();
    ticketId = input.required<string>();

    ticketEditInput = signal<AssignedTicketEditInput>(new AssignedTicketEditInput());

    ticketResponse = httpResource(() => `/api/assign-tickets/${this.techId()}/${this.ticketId()}`, {
        defaultValue: new AssignedTicketResponse(),
        parse: (value) => {
            const ticket = value as AssignedTicketResponse;
            this.ticketEditInput.set({status: ticket.status});

            return ticket;
        }
    })

    assignedTicketDb = inject(AssignedTicketDb);
    router = inject(Router);


    async backToList() {
      await this.router.navigate(['/assign-tickets',]);
    }

    async submitTicketEditForm($event: AssignedTicketEditInput) {
        const ticketEdit = this.toAssignedTicketEdit($event);
        await this.assignedTicketDb.editAssignedTicketById(this.techId(), this.ticketId(), ticketEdit);

        await this.router.navigate(['/assign-tickets',]);
    }

    toAssignedTicketEdit(ticket: AssignedTicketEditInput) {
        const ticketEdit : Ticket = {
            techId: this.techId(),
            ticketId: this.ticketId(),
            status: ticket.status,
            assignBy: this.ticketResponse.value().assignBy,
            completed: this.ticketResponse.value().completed,
        }

        return ticketEdit;
    }
}