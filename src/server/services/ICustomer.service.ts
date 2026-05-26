import {type CustomerUncheckedCreateInput, type CustomerUncheckedUpdateInput} from "../../generated/prisma/models/Customer";
import {CustomerResponse} from "../../models/customerResp.model";

export interface ICustomerService {
    changeCustomerStatus(id: string): Promise<CustomerResponse>;
    createCustomer(request: CustomerUncheckedCreateInput): Promise<CustomerResponse>;
    deleteCustomerById(id: string): Promise<CustomerResponse>;
    editCustomerById(id: string, request: CustomerUncheckedUpdateInput): Promise<CustomerResponse>;
    getAllCustomers(): Promise<CustomerResponse[]>;
    getActiveCustomers(): Promise<CustomerResponse[]>;
    getCustomerById(id: string): Promise<CustomerResponse>;
    getInactiveCustomers(): Promise<CustomerResponse[]>;
    getCustomerByUserId(userId: string): Promise<CustomerResponse>;
}