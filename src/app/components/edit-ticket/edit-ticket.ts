import {Component, output, input, signal, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {TicketEditInput} from "../../../models/TicketEditInput";

@Component({
  selector: 'app-edit-ticket',
  imports: [
    FormField
  ],
  templateUrl: './edit-ticket.html',
  styleUrl: './edit-ticket.css',
})
export class EditTicket implements OnInit, OnChanges {
  ticketEditInput = input.required<TicketEditInput>()
  onEditTicket = output<TicketEditInput>();
  onBackToList = output<void>();

  ticketEditModel = signal<TicketEditInput>({
    title: "",
    description: "",
  });

  ticketEditForm = form(this.ticketEditModel, (schemaPath)=> {
    required(schemaPath.description, {message: "Description is required"});
    required(schemaPath.title, {message: "Title is required"});

  });

  ngOnInit(): void {
    this.loadTicket();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadTicket();
  }

  submitTicketCreateForm($event: Event) {
    $event.preventDefault();
    this.onEditTicket.emit(this.ticketEditModel())
  }

  backToList() {
    this.onBackToList.emit();
  }

  loadTicket(){
    this.ticketEditModel.set(this.ticketEditInput());
  }



}
