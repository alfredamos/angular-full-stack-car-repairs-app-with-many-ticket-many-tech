import {Component, input, output} from '@angular/core';
import {ModalDialog} from "../modal-dialog/modal-dialog";
import {TicketResponse} from "../../../models/ticketResponse.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-ticket-detail',
  imports: [
    ModalDialog,
    RouterLink
  ],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail {
  isModalOpen = input.required<boolean>();
  ticket = input.required<TicketResponse>();

  onCloseModal = output<void>();
  onOpenModal = output<void>();
  onDeleteTicket = output<string>();

  closeModal() {
    this.onCloseModal.emit();
  }

  deleteTicket() {
    this.onDeleteTicket.emit(this.ticket().id);
  }

  openModal() {
    this.onOpenModal.emit();
  }
}
