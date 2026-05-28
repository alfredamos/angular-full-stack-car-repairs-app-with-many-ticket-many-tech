import {Component, inject, OnInit, signal} from "@angular/core";
import {EditProfileForm} from "../../components/auth/edit-profile-form/edit-profile-form";
import {EditUserProfile} from "../../../server/validations/auth.validation";
import {AuthService} from "../../services/auth-service";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {UserDto} from "../../../models/userDto.model";

@Component({
    selector: 'app-edit-profile-page',
    imports: [EditProfileForm],
    template: `
    <app-edit-profile-form
        [user]="user()" 
        (onEditProfile)="submitEditProfileForm($event)"
        (onBackToList)="backToList()"
    />
  `,
    standalone: true
})
export default class EditProfilePage implements OnInit{
   user = signal<UserDto>(new UserDto());

   authDb = inject(AuthDb);
   authService = inject(AuthService);
   router = inject(Router);

   async ngOnInit() {
       const response = await this.authDb.getCurrentUser();
       this.user.set(response);
   }

    async submitEditProfileForm(editUserProfile: EditUserProfile) {
       console.log("At point 1, In edit-profile-page, editUserProfile : ", editUserProfile);
       const response = await this.authDb.editUserProfile(editUserProfile);
       console.log("At point 2, In edit-profile-page, response : ", response);
       await this.router.navigate(['/']);
   }

   async backToList() {
       await this.router.navigate(['/']);
   }
}