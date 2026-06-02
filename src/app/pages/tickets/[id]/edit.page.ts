import {Component, inject, input, signal} from "@angular/core";
import {EditTicket} from "../../../components/edit-ticket/edit-ticket";
import {Router} from "@angular/router";
import {TicketDb} from "../../../services/ticket-db";
import {TicketEditInput} from "../../../../models/TicketEditInput";
import {httpResource} from "@angular/common/http";
import {TicketResponse} from "../../../../models/ticketResponse.model";
import {TicketEdit} from "../../../../server/validations/ticket.validation";

@Component({
    selector: 'app-ticket-edit-page',
    imports: [EditTicket],
    template: `
    <app-edit-ticket
        [ticketEditInput]="ticketEditInput()" 
        (onBackToList)="backToList()"
        (onEditTicket)="submitEditTicketForm($event)"
    />
    `,
})
export default class TicketEditPage {
    id = input.required<string>();

    ticketEditInput = signal<TicketEditInput>(new TicketEditInput())

    ticketResponse = httpResource(() => `/api/tickets/${this.id()}`, {
        defaultValue: new TicketResponse(),
        parse: (value) => {
            const ticketResponse = value as TicketResponse;

            this.ticketEditInput.set({title: ticketResponse.title, description: ticketResponse.description});

            return ticketResponse;
        }
    });

    ticketDb = inject(TicketDb);
    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/tickets'])
    }

    async submitEditTicketForm(ticket: TicketEditInput) {
        const ticketEdit = this.toTicketEdit(ticket);
        await this.ticketDb.editTicketById(this.id(), ticketEdit);

        await this.router.navigate(['/tickets'])
    }

    toTicketEdit(ticket: TicketEditInput) {
        const ticketEdit : TicketEdit = {
            id: this.id(),
            title: ticket.title,
            description: ticket.description,
            customerId: this.ticketResponse.value().customerId

        }

        return ticketEdit;
    }
}