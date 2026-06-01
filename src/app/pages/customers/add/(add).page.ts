import {Component, inject} from "@angular/core";
import {CustomerService} from "../../../services/customer-service";
import {CustomerDb} from "../../../services/customer-db";
import {httpResource} from "@angular/common/http";
import {UserDto} from "../../../../models/userDto.model";
import {CustomerCreate} from "../../../components/customer-create/customer-create";
import {CustomerCreate as Customer} from "../../../../server/validations/customer.validation";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-customer-page',
    imports: [CustomerCreate],
    template: `
    <app-customer-create
        [users]="users.value()"
        (onBackToList)="backToList()"
        (onCreateCustomer)="submitCustomerCreateForm($event)"
    />
    `
})
export default class AddCustomerPage {
    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);
    router = inject(Router);

    users = httpResource<UserDto[]>(() => '/api/users', {
        defaultValue: [],
    });

    async backToList() {
        await this.router.navigate(['/customers']);
    }

    async submitCustomerCreateForm(customerCreate: Customer) {
        await this.customerDb.createCustomer(customerCreate);
        await this.router.navigate(['/customers']);
    }
}