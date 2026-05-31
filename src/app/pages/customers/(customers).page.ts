import {Component, inject} from "@angular/core";
import {CustomerTable} from "../../components/customer-table/customer-table";
import {CustomerResponse} from "../../../models/customerResp.model";
import {CustomerService} from "../../services/customer-service";
import {CustomerDb} from "../../services/customer-db";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-customers-list-page',
    imports: [CustomerTable],
    template: `
       <app-customer-table
           [customers]="customers.value()"
           (onChangeStatus)="changeCustomerStatus($event)"
       />
    `,
    standalone: true
})
export default class CustomersPage{
    defaultValue = new CustomerResponse();

    customers =  httpResource(() => '/api/customers', {
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