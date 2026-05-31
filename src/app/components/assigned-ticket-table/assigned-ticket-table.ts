import {Component, inject, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {AuthService} from "../../services/auth-service";
import {AssignedTicketResponse} from "../../../models/assignedTicketResponse.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-assigned-ticket-table',
  imports: [
    RouterLink,
      DatePipe
  ],
  templateUrl: './assigned-ticket-table.html',
  styleUrl: './assigned-ticket-table.css',
})
export class AssignedTicketTable {
  authService = inject( AuthService);
  tickets = input.required<AssignedTicketResponse[]>();

  onChangeTicketStatus = output<{techId: string; ticketId: string}>()

  changeTicketStatus(techId: string, ticketId: string) {
    this.onChangeTicketStatus.emit({techId, ticketId});
  }

}
