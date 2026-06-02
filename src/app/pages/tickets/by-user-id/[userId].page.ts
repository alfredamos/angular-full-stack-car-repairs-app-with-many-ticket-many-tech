import {Component, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {TicketResponse} from "../../../../models/ticketResponse.model";
import {TicketTable} from "../../../components/ticket-table/ticket-table";

@Component({
    selector: 'app-tickets-by-customer-id-page',
    imports: [
        TicketTable
    ],
    template: `
        <app-ticket-table
                [tickets]="tickets.value()"
        />`,
})
export default class TicketsByUserIdPage {
    userId = input.required<string>();

    tickets = httpResource<TicketResponse[]>(() => `/api/tickets/by-user-id/${this.userId()}`, {
        defaultValue: [],
    });
}