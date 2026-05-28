import {Component, inject} from "@angular/core";
import {LoginForm} from "../../components/auth/login-form/login-form";
import {LoginUser} from "../../../server/validations/auth.validation";
import {Router} from "@angular/router";
import {AuthDb} from "../../services/auth-db";

@Component({
    selector: 'app-login-page',
    imports: [LoginForm],
    template: `
    <app-login-form
            (onLogin)="loginSubmit($event)"
            (onBack)="backToList()"
    />
    `,
    standalone: true
})
export default class LoginPage {
    authDb = inject(AuthDb)

    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/']);
    }

    async loginSubmit(loginUser: LoginUser) {
        console.log("At point 1, In login-user-page, signupUser : ", loginUser);
        const response = await this.authDb.loginUser(loginUser);
        console.log("At point 2, In login-user-page, response : ", response);
        await this.router.navigate(['/']);
    }
}