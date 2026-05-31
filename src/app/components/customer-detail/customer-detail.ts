import { Component, input, output } from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ModalDialog} from "../modal-dialog/modal-dialog";
import {CustomerResponse} from "../../../models/customerResp.model";

@Component({
  selector: 'app-customer-detail',
    imports: [
        ModalDialog,
        DatePipe,
        RouterLink
    ],
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail {
  isModalOpen = input.required<boolean>();
  customer = input.required<CustomerResponse>();

  onCloseModal = output<void>();
  onDeleteCustomer = output<string>();
  onOpenModal = output<void>();

  closeModal() {
    this.onCloseModal.emit();
  }

  openModal() {
    this.onOpenModal.emit();
  }


  deleteCustomer() {
    this.onDeleteCustomer.emit(this.customer().id);
  }
}
