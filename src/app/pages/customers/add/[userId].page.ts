import {Component, computed, inject} from "@angular/core";
import {CustomerDb} from "../../../services/customer-db";
import {CustomerService} from "../../../services/customer-service";
import {Router} from "@angular/router";
import {httpResource} from "@angular/common/http";
import {UserDto} from "../../../../models/userDto.model";
import {CustomerCreate as Customer} from "../../../../server/validations/customer.validation";
import {CustomerCreateWithUser} from "../../../components/customer-create-with-user/customer-create-with-user";
import {AuthService} from "../../../services/auth-service";

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
    authService = inject(AuthService);
    userId = computed(() => this.authService.id())

    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);
    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/customers']);
    }

    async submitCustomerCreateForm(customerCreate: Customer) {
        console.log(customerCreate);
        await this.customerDb.createCustomer(customerCreate);
        await this.router.navigate(['/customers']);
    }
}