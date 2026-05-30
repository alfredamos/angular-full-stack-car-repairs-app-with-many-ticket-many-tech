import {computed, Injectable, signal} from '@angular/core';
import {CustomerResponse} from "../../models/customerResp.model";
import {LocalStorageParam} from "../utils/localStorageParam.util";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customersState = signal<CustomerResponse[]>([]);
  customers = computed(() => this.customersState.asReadonly()() || this.getLocalStore());

  updateCustomers(customers: CustomerResponse[]) {
    this.setLocalStore(customers);
    this.customersState.set(customers);
  }

  addCustomer(customer: CustomerResponse) {
    this.customersState.update(customers => [...customers, customer]);
    this.setLocalStore(this.customersState());
  }

  deleteCustomer(id: string) {
    this.customersState.update(customers => customers.filter(customer => customer.id !== id));
    this.setLocalStore(this.customersState());
  }

  clearCustomers() {
    this.customersState.set([]);
    this.setLocalStore(this.customersState());
  }

  getCustomerById(id: string) {
    return this.customersState().find(customer => customer.id === id);
  }

  getCustomerByUserId(userId: string) {
    return this.customersState().find(customer => customer.userId === userId);
  }

  updateCustomer(customer: CustomerResponse) {
    this.customersState.update(customers => customers.map(c => c.id === customer.id ? customer : c));
    this.setLocalStore(this.customersState());
  }

  setLocalStore(customers: CustomerResponse[]) {
    localStorage.setItem(LocalStorageParam.customerKey, JSON.stringify(customers));
  }

  getLocalStore() {
    return JSON.parse(localStorage.getItem(LocalStorageParam.customerKey) as string) as CustomerResponse[];
  }

  removeLocalStore() {
    this.clearCustomers();
    localStorage.removeItem(LocalStorageParam.customerKey)
  }
}
