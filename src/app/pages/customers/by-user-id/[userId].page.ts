import {Component, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {CustomerResponse} from "../../../../models/customerResp.model";
import {CustomerDb} from "../../../services/customer-db";
import {CustomerService} from "../../../services/customer-service";
import {CustomerTable} from "../../../components/customer-table/customer-table";

@Component({
    selector: 'app-customer-by-user-id-page',
    imports: [
        CustomerTable
    ],
    template: `
        <app-customer-table
                [customers]="customers.value()"
                (onChangeStatus)="changeCustomerStatus($event)"
        />
    `
})
export default class CustomerByUserIdPage {
    userId = input.required<string>();
    customers = httpResource(() => `/api/customers/by-user-id/${this.userId()}`,{
        defaultValue: [],
        parse: (value: unknown) => {
            const customers = value as CustomerResponse[];
            this.customerService.updateCustomers(customers);
            return customers;
        },
    });

    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);

    async changeCustomerStatus(id: string) {
        await this.customerDb.changeCustomerStatus(id);
        this.customers.set(this.customerService.customers());
    }
}