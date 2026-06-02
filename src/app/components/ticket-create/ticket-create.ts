import {Component, input, OnInit, output, signal} from '@angular/core';
import {TicketCreate as Ticket} from "../../../server/validations/ticket.validation";
import {CustomerResponse} from "../../../models/customerResp.model";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-ticket-create',
  imports: [
    FormField
  ],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.css',
})
export class TicketCreate implements OnInit{
  customers = input.required<CustomerResponse[]>();

  onCreateTicket = output<Ticket>();
  onBackToList = output<void>();

  ticketCreateModel = signal<Ticket>({
    customerId: "",
    title: "",
    description: "",
  });

  ticketCreateForm = form(this.ticketCreateModel, (schemaPath)=> {
    required(schemaPath.customerId, {message: "CustomerId is required"});
    required(schemaPath.description, {message: "Description is required"});
    required(schemaPath.title, {message: "Title is required"});

  });

  ngOnInit(): void {
    this.customers();
  }

  submitTicketCreateForm($event: Event) {
    $event.preventDefault();
    this.onCreateTicket.emit(this.ticketCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }

}
