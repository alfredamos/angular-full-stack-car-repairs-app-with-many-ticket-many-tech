import { Component, input, output } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {User} from "../../../models/User";
import {ChangeUserRole} from "../../../server/validations/auth.validation";
import {formattedDate} from "../../utils/formattedDate";
import {UserType} from "../../../models/UserType.model";

@Component({
  selector: 'app-users-table',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable {
  users = input.required<User[]>()

  onChangeRole = output<ChangeUserRole>()

  async changeRole(user: ChangeUserRole) {
    console.log("At point 1, In users-table, user : ", user);
    this.onChangeRole.emit(user);
  }

  displayDate(date: Date){
    const dateString = date.toString()?.split('T')[0];
    return formattedDate(new Date(dateString));
  };

  protected readonly formattedDate = formattedDate;
    protected readonly UserType = UserType;
}
