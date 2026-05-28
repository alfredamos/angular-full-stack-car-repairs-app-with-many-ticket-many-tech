import {Component, inject} from "@angular/core";
import {SignupForm} from "../../components/auth/signup-form/signup-form";
import {AuthDb} from "../../services/auth-db";
import {Router} from "@angular/router";
import {SignupUser} from "../../../server/validations/auth.validation";

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
        console.log("At point 1, In signup-user-page, signupUser : ", signupUser);
        const response = await this.authDb.signupUser(signupUser);
        console.log("At point 2, In signup-user-page, response : ", response);
        await this.router.navigate(['/']);
    }
}