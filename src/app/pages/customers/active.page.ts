import {Component, inject} from "@angular/core";
import {CustomerTable} from "../../components/customer-table/customer-table";
import {CustomerResponse} from "../../../models/customerResp.model";
import {CustomerDb} from "../../services/customer-db";
import {CustomerService} from "../../services/customer-service";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-active-customers-page',
    imports: [CustomerTable],
    template: `
    <app-customer-table
        [customers]="customers.value() || []"
        (onChangeStatus)="changeCustomerStatus($event)"
    />
    `
})
export default class ActiveCustomersPage{
    customerService = inject(CustomerService);

    customers = httpResource(() => '/api/customers', {
        defaultValue: [],
        parse: (value) => {
            const customers = value as CustomerResponse[];
            this.customerService.updateCustomers(customers);
            return customers.filter(customer => customer.active);
        }
    });

    customerDb = inject(CustomerDb);

    async changeCustomerStatus(id: string) {
        await this.customerDb.changeCustomerStatus(id);
        this.customers.set(this.customerService.customers().filter(customer => customer.active));
    }
}