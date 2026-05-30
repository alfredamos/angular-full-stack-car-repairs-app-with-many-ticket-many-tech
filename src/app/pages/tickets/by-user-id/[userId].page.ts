import {Component, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {TicketResponse} from "../../../../models/ticketResponse.model";
import {CustomerResponse} from "../../../../models/customerResp.model";
import {TicketTable} from "../../../components/ticket-table/ticket-table";

@Component({
    selector: 'app-tickets-by-customer-id-page',
    imports: [
        TicketTable
    ],
    template: `
        <app-ticket-table
                [tickets]="tickets.value() || []"
        />`,
})
export default class TicketsByUserIdPage {
    userId = input.required<string>();

    customer = httpResource<CustomerResponse>(() => `/api/customers/by-user-id/${this.userId()}`);

    tickets = httpResource<TicketResponse[]>(() => `/api/tickets/by-customer-id/${this.customer.value()?.id}`);
}