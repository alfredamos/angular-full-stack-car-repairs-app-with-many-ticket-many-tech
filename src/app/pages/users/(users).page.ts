import {Component, inject} from "@angular/core";
import {UsersTable} from "../../components/users-table/users-table";
import {ChangeUserRole} from "../../../server/validations/auth.validation";
import {UserDto} from "../../../models/userDto.model";
import {AuthDb} from "../../services/auth-db";
import {UserService} from "../../services/user-service";
import { httpResource } from '@angular/common/http';


@Component({
    selector: 'app-users-list-page',
    imports: [UsersTable],
    template: `
        <app-users-table
                [users]="users.value() || []"
                (onChangeRole)="changeUserRole($event)"
        />`,
    standalone: true
})
export default class UsersPage {
    users = httpResource<UserDto[]>(() => '/api/users')

    userService = inject(UserService);
    authDb = inject(AuthDb);

    async changeUserRole(changeUserRole: ChangeUserRole) {
        //----> Change user role.
        await this.authDb.changeUserRole(changeUserRole);
        this.users.set(this.userService.users()); //----> Update the users in the signal
    }

}