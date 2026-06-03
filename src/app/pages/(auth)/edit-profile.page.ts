import {Component, inject} from "@angular/core";
import {EditProfileForm} from "../../components/auth/edit-profile-form/edit-profile-form";
import {EditUserProfile} from "../../../server/validations/auth.validation";
import {AuthService} from "../../services/auth-service";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {UserDto} from "../../../models/userDto.model";
import {httpResource} from "@angular/common/http";
import {emptyUserDto} from "../../../models/emptyUserDto";

@Component({
    selector: 'app-edit-profile-page',
    imports: [EditProfileForm],
    template: `
    <app-edit-profile-form
        [user]="user.value()" 
        (onEditProfile)="submitEditProfileForm($event)"
        (onBackToList)="backToList()"
    />
  `,
    standalone: true
})
export default class EditProfilePage{
   user = httpResource<UserDto>(() => '/api/auth/me', {
       defaultValue: emptyUserDto
   });

   authDb = inject(AuthDb);
   authService = inject(AuthService);
   router = inject(Router);

   async submitEditProfileForm(editUserProfile: EditUserProfile) {
       await this.authDb.editUserProfile(editUserProfile);
       await this.router.navigate(['/']);
   }

   async backToList() {
       await this.router.navigate(['/']);
   }

   protected readonly emptyUserDto = emptyUserDto;
}