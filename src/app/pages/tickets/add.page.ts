import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {TicketDb} from "../../services/ticket-db";
import {TicketCreate as Ticket} from "../../../server/validations/ticket.validation";
import {TicketCreate} from "../../components/ticket-create/ticket-create";
import {httpResource} from "@angular/common/http";
import {CustomerResponse} from "../../../models/customerResp.model";

@Component({
    selector: 'app-add-ticket-page',
    imports: [TicketCreate],
    template: `
    <app-ticket-create
        [customers]="customers.value()"  
        (onBackToList)="backToList()"
        (onCreateTicket)="submitTicketCreateForm($event)"
    />
    `,
})
export default class AddTicketPage {
    customers = httpResource<CustomerResponse[]>(() => '/api/customers',{
        defaultValue: [],
    })

    ticketDb = inject(TicketDb);
    router = inject(Router);

    async backToList() {
       await this.router.navigate(['/tickets']);
    }

    async submitTicketCreateForm(ticket: Ticket) {
        await this.ticketDb.createTicket(ticket);
        await this.router.navigate(['/tickets']);
    }
}