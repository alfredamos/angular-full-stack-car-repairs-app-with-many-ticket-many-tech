import {Component, signal, inject, input} from "@angular/core";
import {httpResource} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomerDetail} from "../../../components/customer-detail/customer-detail";
import {CustomerDb} from "../../../services/customer-db";
import {CustomerService} from "../../../services/customer-service";
import {CustomerResponse} from "../../../../models/customerResp.model";

@Component({
    selector: 'app-customer-detail-page',
    imports: [CustomerDetail],
    template: `
    <app-customer-detail
        [customer]="customer.value()"  
        [isModalOpen]="isModalOpen()"
        (onCloseModal)="closeModal()"
        (onOpenModal)="openModal()"
        (onDeleteCustomer)="deleteCustomer($event)"
    />
    `
})
export default class CustomerDetailPage {
    id = input.required<string>();

    isModalOpen = signal(false);

    initialCustomer = new CustomerResponse();

    customer = httpResource<CustomerResponse>(() => `/api/customers/${this.id()}`,{
        defaultValue: this.initialCustomer,
    })

    customerDb = inject(CustomerDb);
    customerService = inject(CustomerService);
    router = inject(Router);

    closeModal() {
        this.isModalOpen.set(false);
    }

    openModal() {
        this.isModalOpen.set(true);
    }

    async deleteCustomer(id: string) {
        await this.customerDb.deleteCustomerById(id);
        this.customerService.updateCustomers(this.customerService.customers());
        await this.router.navigate(['/customers']);
    }
}