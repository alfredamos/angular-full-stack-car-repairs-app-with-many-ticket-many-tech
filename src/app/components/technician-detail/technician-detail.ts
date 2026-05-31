import {Component, input, output} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ModalDialog} from "../modal-dialog/modal-dialog";
import {TechnicianResponse} from "../../../models/technicianResp.model";

@Component({
  selector: 'app-technician-detail',
  imports: [
    DatePipe,
    RouterLink,
    ModalDialog,
    NgOptimizedImage
  ],
  templateUrl: './technician-detail.html',
  styleUrl: './technician-detail.css',
})
export class TechnicianDetail {
  isModalOpen = input.required<boolean>();
  tech = input.required<TechnicianResponse>();

  onCloseModal = output<void>();
  onOpenModal = output<void>();
  onDeleteTechnician = output<string>();

  openModal() {
    this.onOpenModal.emit();
  }

  closeModal() {
    this.onCloseModal.emit();
  }

  deleteTechnician() {
    this.onDeleteTechnician.emit(this.tech().id);
  }
}
