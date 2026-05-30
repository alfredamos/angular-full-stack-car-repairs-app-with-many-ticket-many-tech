import {Component, inject, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth-service";
import {TicketResponse} from "../../../models/ticketResponse.model";

@Component({
  selector: 'app-ticket-table',
    imports: [
        RouterLink
    ],
  templateUrl: './ticket-table.html',
  styleUrl: './ticket-table.css',
})
export class TicketTable {
  authService = inject( AuthService);
  tickets = input.required<TicketResponse[]>()

}
