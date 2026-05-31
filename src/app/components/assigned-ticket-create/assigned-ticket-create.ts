import {Component, input, OnInit, output, signal} from '@angular/core';
import {TicketResponse} from "../../../models/ticketResponse.model";
import {TechnicianResponse} from "../../../models/technicianResp.model";
import {AssignedTicketCreate as Ticket} from "../../../server/validations/assignedTicket.validation";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-assigned-ticket-create',
  imports: [
    FormField
  ],
  templateUrl: './assigned-ticket-create.html',
  styleUrl: './assigned-ticket-create.css',
})
export class AssignedTicketCreate implements OnInit{
  techs = input.required<TechnicianResponse[]>();
  tickets = input.required<TicketResponse[]>();

  onBackToList = output<void>();
  onTicketCreate = output<Ticket>();

  ticketCreateModel = signal<Ticket>({
    ticketId: "",
    techId: "",
    assignBy: "",
  });

  ticketCreateForm = form(this.ticketCreateModel, (schemaPath)=> {
    required(schemaPath.ticketId, {message: "TicketId is required"});
    required(schemaPath.techId, {message: "TechId is required"});
  })

  ngOnInit(): void {
    this.techs();
    this.tickets();
  }

  submitTicketCreateForm($event: Event) {
    $event.preventDefault();
    this.onTicketCreate.emit(this.ticketCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }



}
