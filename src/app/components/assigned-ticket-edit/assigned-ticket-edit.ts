import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {Status} from "../../../generated/prisma/enums";
import {AssignedTicketEdit as Ticket} from "../../../server/validations/assignedTicket.validation";
import {AssignedTicketResponse} from "../../../models/assignedTicketResponse.model";

@Component({
  selector: 'app-assigned-ticket-edit',
  imports: [
    FormField
  ],
  templateUrl: './assigned-ticket-edit.html',
  styleUrl: './assigned-ticket-edit.css',
})
export class AssignedTicketEdit implements OnInit, OnChanges {
  ticket = input.required<AssignedTicketResponse>();

  onBackToList = output<void>();
  onTicketEdit = output<Ticket>();

  ticketEditModel = signal<Ticket>({
    ticketId: "",
    techId: "",
    assignBy: "",
    status: Status.Open,
    completed: false
  });

  ngOnInit(): void {
    this.loadTicket();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadTicket();
  }

  ticketEditForm = form(this.ticketEditModel, (schemaPath)=> {
    required(schemaPath.status, {message: "Status is required"});
  })

  submitTicketEditForm($event: Event) {
    $event.preventDefault();
    this.onTicketEdit.emit(this.ticketEditModel())
  }

  backToList() {
    this.onBackToList.emit();
  }

  loadTicket(){
    this.ticket();
    this.ticketEditModel.set({ticketId: this.ticket().ticketId, techId: this.ticket().techId, assignBy: this.ticket().assignBy, status: this.ticket().status, completed: this.ticket().completed});
  }


  protected readonly Status = Status;
}
