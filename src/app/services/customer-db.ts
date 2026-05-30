import {inject, Injectable} from '@angular/core';
import {CustomerCreate, CustomerEdit} from "../../server/validations/customer.validation";
import {ApiHttpClientService} from "./api-client-service";
import {CustomerResponse} from "../../models/customerResp.model";
import {CustomerService} from "./customer-service";

@Injectable({
  providedIn: 'root',
})
export class CustomerDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<CustomerCreate | CustomerEdit | null>;
  customerService = inject(CustomerService);

  async changeCustomerStatus(id: string) {
    try {
      const response = await this.apiClient.patch<CustomerResponse>(`/customers/change-status/${id}`, null);
      this.customerService.updateCustomer(response);
      return response;
    }catch (err){
      console.log(" error-message in change-customer-status, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async createCustomer(customerCreate: CustomerCreate) {
    try {
      const response =  await this.apiClient.post<CustomerResponse>('/customers', customerCreate);
      this.customerService.addCustomer(response);
      return response;
    }catch (err){
      console.log(" error-message in create-customer, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async deleteCustomerById(id: string) {
    try {
      const response = await this.apiClient.delete<CustomerResponse>(`/customers/${id}`);
      this.customerService.deleteCustomer(id);
      return response;
    }catch (err){
      console.log(" error-message in delete-customer-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async editCustomerById(id: string, customerEdit: CustomerEdit) {
    try {
      const response = await this.apiClient.patch<CustomerResponse>(`/customers/${id}`, customerEdit);
      this.customerService.updateCustomer(response);
      return response;
    }catch (err){
      console.log(" error-message in edit-customer-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async getCustomerById(id: string) {
    try {
      const response = await this.apiClient.get<CustomerResponse>(`/customers/${id}`);
      this.customerService.getCustomerById(id)
      return response;
    }catch (err){
      console.log(" error-message in get-customer-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async getCustomerByUserId(userId: string) {
    try {
      const response = await this.apiClient.get<CustomerResponse>(`/customers/by-user-id/${userId}`);
      this.customerService.getCustomerByUserId(userId)
      return response;
    }catch (err){
      console.log(" error-message in get-customer-by-user-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

}
