import { Component, input, output } from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {formattedDate} from "../../utils/formattedDate";
import {stringToDate} from "../../utils/stringDate";
import {AssignedTicketResponse} from "../../../models/assignedTicketResponse.model";
import {ModalDialog} from "../modal-dialog/modal-dialog";

@Component({
  selector: 'app-assigned-ticket-detail',
    imports: [RouterLink, ModalDialog, DatePipe],
  templateUrl: './assigned-ticket-detail.html',
  styleUrl: './assigned-ticket-detail.css',
})
export class AssignedTicketDetail {
    isModalOpen = input.required<boolean>();
    isAdmin = input.required<boolean>();
    ticket = input.required<AssignedTicketResponse>();

    onCloseModal = output<void>();
    onDeleteAssignedTicket = output<{techId:string; ticketId: string}>();
    onOpenModal = output<void>();


    readonly formattedDate = formattedDate;
    readonly stringToDate = stringToDate;

    openModal() {
        this.onOpenModal.emit();
    }

    closeModal() {
        this.onCloseModal.emit();
    }

    deleteAssignedTicket() {
        this.onDeleteAssignedTicket.emit({techId: this.ticket().techId, ticketId: this.ticket().ticketId});
    }
}
