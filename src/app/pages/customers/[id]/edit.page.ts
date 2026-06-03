import {Component, inject, input, signal} from "@angular/core";
import {EditCustomer} from "../../../components/edit-customer/edit-customer";
import {CustomerEdit} from "../../../../server/validations/customer.validation";
import {CustomerDb} from "../../../services/customer-db";
import {httpResource} from "@angular/common/http";
import {CustomerResponse} from "../../../../models/customerResp.model";
import {Router} from "@angular/router";
import {CustomerInputEdit} from "../../../../models/customerInputEdit.model";

@Component({
    selector: 'app-customer-edit-page',
    imports: [EditCustomer],
    template: `
    <app-edit-customer
        [customer]="customerInputEdit()" 
        (onBackToList)="backToList()"
        (onEditCustomer)="submitCustomerEditForm($event)"
    />
    `
})
export default class CustomerEditPage {
    customerInputEdit = signal<CustomerInputEdit>(new CustomerInputEdit());
    id = input.required<string>();

    customerDb = inject(CustomerDb);
    router = inject(Router);

    customer = httpResource(() => `/api/customers/${this.id()}`,{
        defaultValue: new CustomerResponse(),
        parse: (value) => {
            const customer = value as CustomerResponse;
            this.customerInputEdit.set({
                address: customer.address,
                notes: customer.notes,
            })
            return customer;
        }
    });

    async backToList() {
        await this.router.navigate(['/customers']);
    }

    async submitCustomerEditForm(customer: CustomerInputEdit) {
        const customerEdit = this.toCustomerEdit(customer);
        await this.customerDb.editCustomerById(this.id(), customerEdit);

        await this.router.navigate(['/customers']);
    }

    toCustomerEdit(customer: CustomerInputEdit) {
        const customerEdit : CustomerEdit = {
            id: this.id(),
            address: customer.address,
            notes: customer.notes,
            active: this.customer.value().active,
            userId: this.customer.value().userId,
        }

        return customerEdit;
    }
}