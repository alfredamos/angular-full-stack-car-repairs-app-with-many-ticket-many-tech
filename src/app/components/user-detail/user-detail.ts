import {Component, input, output} from '@angular/core';
import {ModalDialog} from "../modal-dialog/modal-dialog";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {UserDto} from "../../../models/userDto.model";

@Component({
  selector: 'app-user-detail',
  imports: [
    ModalDialog,
    RouterLink,
    DatePipe
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  isModalOpen = input.required<boolean>();
  user = input.required<UserDto>();

  onCloseModal = output<void>();
  onDeleteUser = output<string>();
  onOpenModal = output<void>();


  closeModal() {
    this.onCloseModal.emit();
  }

  deleteUser() {
    this.onDeleteUser.emit(this.user().id);
  }

  openModal() {
    this.onOpenModal.emit();
  }
}
