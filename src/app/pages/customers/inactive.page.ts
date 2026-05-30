import {Component, inject, OnInit, signal} from "@angular/core";
import {CustomerTable} from "../../components/customer-table/customer-table";
import {CustomerResponse} from "../../../models/customerResp.model";
import {CustomerDb} from "../../services/customer-db";
import {CustomerService} from "../../services/customer-service";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-inactive-customers-page',
    imports: [CustomerTable],
    template: `
    <app-customer-table
        [customers]="customers.value() || []"
        (onChangeStatus)="changeCustomerStatus($event)"
    />
    `
})
export default class InactiveCustomersPage{
    customers = httpResource<CustomerResponse[]>(() => '/api/customers/all/inactive');

    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);

    async changeCustomerStatus(id: string) {
        await this.customerDb.changeCustomerStatus(id);
        this.customers.set(this.customerService.customers());
    }
}