import {Component, inject, input, signal} from "@angular/core";
import {UserDetail} from "../../../components/user-detail/user-detail";
import {httpResource} from "@angular/common/http";
import {UserDto} from "../../../../models/userDto.model";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user-service";
import {UserDb} from "../../../services/user-db";

@Component({
    selector: 'app-user-detail-page',
    imports: [UserDetail],
    template: `
    <app-user-detail
        [isModalOpen]="isModalOpen()"
        [user]="user.value()"       
        (onOpenModal)="openModal()"
        (onCloseModal)="closeModal()"
        (onDeleteUser)="deleteUser($event)"
    />
    `,
})
export default class UserDetailPage {
    id = input.required<string>();
    isModalOpen = signal(false);

    user = httpResource<UserDto>(() => `/api/users/${this.id()}`,{
        defaultValue: new UserDto(),
    });

    userDb = inject(UserDb);
    userService = inject(UserService);
    router = inject(Router);

    openModal() {
        this.isModalOpen.set(true);
    }

    closeModal() {
        this.isModalOpen.set(false);
    }

    async deleteUser(id: string) {
        await this.userDb.deleteUserById(id);
        this.userService.updateUsers(this.userService.users());

        await this.router.navigate(['/users'])
    }
}