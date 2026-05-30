import {Component, inject, OnInit, signal} from "@angular/core";
import {TicketTable} from "../../components/ticket-table/ticket-table";
import {TicketResponse} from "../../../models/ticketResponse.model";
import {TicketService} from "../../services/ticket-service";
import {TicketDb} from "../../services/ticket-db";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-tickets-list-page',
    imports: [TicketTable],
    template: `
    <app-ticket-table
        [tickets]="tickets.value() || []"       
    />
    `,
    standalone: true
})
export default class TicketsPage{
    tickets = httpResource<TicketResponse[]>(() => '/api/tickets');

}