import {Component, inject} from "@angular/core";
import {SignupForm} from "../../components/auth/signup-form/signup-form";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {SignupUser} from "../../../server/validations/auth.validation";
import {UserType} from "../../../models/UserType.model";

@Component({
    selector: 'app-signup-page',
    imports: [SignupForm],
    template: `
    <app-signup-form
            (onSignup)="signupSubmit($event)"
            (onBackToList)="backToList()"
    />
    `,
    standalone: true
})
export default class SignupPage {
    authDb = inject(AuthDb);
    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/']);
    }

    async signupSubmit(signupUser: SignupUser) {
        const newUser = await this.authDb.signupUser(signupUser);
        await this.router.navigate([`${newUser.userType === UserType.Customer ? `/customers/add/${newUser.id}` : `/technicians/add/${newUser.id}` }`]);
    }
}