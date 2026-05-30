import {Component, inject} from "@angular/core";
import {ChangePasswordForm} from "../../components/auth/change-password-form/change-password-form";
import {AuthService} from "../../services/auth-service";
import {ChangeUserPassword} from "../../../server/validations/auth.validation";
import {Router} from "@angular/router";
import {AuthDb} from "../../services/auth-db";

@Component({
    selector: 'app-change-password-page',
    imports: [ChangePasswordForm],
    template: `
    <app-change-password-form
            [email]="email()"
            (onChangeUserPassword)="submitPasswordChangeForm($event)"
            (onBackToList)="backToList()"
    />
  `,
    standalone: true
})
export default class ChangePasswordPage {
    authDb = inject(AuthDb);
    authService = inject(AuthService);
    router = inject(Router);

    email = this.authService.email;

    async submitPasswordChangeForm(changeUserPassword: ChangeUserPassword) {
        await this.authDb.changeUserPassword(changeUserPassword);

        await this.router.navigate(['/']);
    }

    async backToList() {
        await this.router.navigate(['/']);
    }
}