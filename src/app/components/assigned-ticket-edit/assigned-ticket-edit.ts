import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {Status} from "../../../generated/prisma/enums";
import {AssignedTicketEditInput} from "../../../models/AssignedTicketEditInput";

@Component({
  selector: 'app-assigned-ticket-edit',
  imports: [
    FormField
  ],
  templateUrl: './assigned-ticket-edit.html',
  styleUrl: './assigned-ticket-edit.css',
})
export class AssignedTicketEdit implements OnInit, OnChanges {
  ticket = input.required<AssignedTicketEditInput>();

  onBackToList = output<void>();
  onTicketEdit = output<AssignedTicketEditInput>();

  ticketEditModel = signal<AssignedTicketEditInput>({
    status: Status.Open,
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
    this.ticketEditModel.set(this.ticket());
  }


  protected readonly Status = Status;
}
