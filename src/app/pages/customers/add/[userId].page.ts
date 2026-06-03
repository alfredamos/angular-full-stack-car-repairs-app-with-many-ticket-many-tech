import {Component, computed, inject, input} from "@angular/core";
import {CustomerDb} from "../../../services/customer-db";
import {AuthService} from "../../../services/auth-service";
import {Router} from "@angular/router";
import {httpResource} from "@angular/common/http";
import {UserDto} from "../../../../models/userDto.model";
import {CustomerCreate as Customer} from "../../../../server/validations/customer.validation";
import {CustomerCreateWithUser} from "../../../components/customer-create-with-user/customer-create-with-user";

@Component({
    selector: 'app-add-customer-by-user-id-page',
    imports: [
        CustomerCreateWithUser
    ],
    template: `
    <app-customer-create-with-user
        [userId]="userId()" 
        (onBackToList)="backToList()"
        (onCreateCustomer)="submitCustomerCreateForm($event)"
    />
    `,
})
export default class AddCustomerByUserIdPage {
    userId = input.required<string>();

    authService = inject(AuthService);
    customerDb = inject(CustomerDb);
    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/customers']);
    }

    async submitCustomerCreateForm(customerCreate: Customer) {

        console.log("In create-page, customerCreate: ", customerCreate);
        await this.customerDb.createCustomer(customerCreate);
        await this.router.navigate([`${this.authService.isAdmin() ? '/customers' : '/'}`]);
    }
}