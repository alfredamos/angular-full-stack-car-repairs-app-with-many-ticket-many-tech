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
                [customers]="customers.value() || []"
                (onChangeStatus)="changeCustomerStatus($event)"
        />
    `
})
export default class CustomerByUserIdPage {
    userId = input.required<string>();
    customers = httpResource<CustomerResponse[]>(() => `/api/customers/by-user-id/${this.userId()}`);

    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);

    async changeCustomerStatus(id: string) {
        await this.customerDb.changeCustomerStatus(id);
        this.customers.set(this.customerService.customers());
    }
}