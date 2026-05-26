import { CustomerUncheckedCreateInput, CustomerUncheckedUpdateInput } from "src/generated/prisma/models";
import {CustomerResponse, toCustomerResponse} from "src/models/customerResp.model";
import {ICustomerService} from "./ICustomer.service";
import {prisma} from "../db/prisma.db";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";
import {CustomerWithUser} from "../../models/customerWithUser.model";

class CustomerService implements ICustomerService {
    async changeCustomerStatus(id: string): Promise<CustomerResponse> {
        //----> Fetch customer by id.
        const customer = await this.getOneCustomer(id);

        //----> Change the customer status.
        const active = !customer.active;

        //----> Update the changes.
        const updatedCustomer = await prisma.customer.update({where: {id}, data: { active}, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(updatedCustomer as CustomerWithUser);
    }

    async createCustomer(request: CustomerUncheckedCreateInput): Promise<CustomerResponse> {
        //----> Insert the new customer into database.
        const customer = await prisma.customer.create({data: request, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(customer as CustomerWithUser);
    }

    async deleteCustomerById(id: string): Promise<CustomerResponse> {
        //----> Check for existence of customer.
        await this.getOneCustomer(id);

        //----> Delete the customer.
        const deletedCustomer = await prisma.customer.delete({where: {id}, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(deletedCustomer as CustomerWithUser);
    }

    async editCustomerById(id: string, request: CustomerUncheckedUpdateInput): Promise<CustomerResponse> {
        //----> Check for existence of customer.
        await this.getOneCustomer(id);

        //----> Update the customer.
        const updatedCustomer = await prisma.customer.update({where: {id}, data: request, include: {user: true}});

        //----> Send back response.
        return toCustomerResponse(updatedCustomer as CustomerWithUser);
    }

    async getAllCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({include: {user: true}});

        //----> Send back response.
        return customers.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    async getActiveCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({where: {active: true}, include: {user: true}});

        //----> Send back response.
        return customers.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    async getCustomerById(id: string): Promise<CustomerResponse> {
        //----> Fetch customer by id.
        const customer = await this.getOneCustomer(id);

        //----> Send back response.
        return toCustomerResponse(customer as CustomerWithUser);
    }

    async getInactiveCustomers(): Promise<CustomerResponse[]> {
        //----> Fetch all customers.
        const customers = await prisma.customer.findMany({where: {active: false}, include: {user: true}});

        //----> Send back response.
        return customers.map(customer => toCustomerResponse(customer as CustomerWithUser));
    }

    async getCustomerByUserId(userId: string): Promise<CustomerResponse> {
        //----> Fetch customer by user id.
        const customer = await prisma.customer.findUnique({where: {userId}, include: {user: true}});

        //----> Check for null customer.
        if (!customer){
            throw createError({statusText: "Customer not found.", statusCode: StatusCodes.NOT_FOUND, message: "Customer not found."});
        }

        //----> Send back response.
        return toCustomerResponse(customer as CustomerWithUser);
    }

    private async getOneCustomer(id: string) {
        //----> Fetch customer by id.
        const customer = await prisma.customer.findUnique({where: {id}, include: {user: true}});

        //----> Check for null customer.
        if (!customer){
            throw createError({statusText: "Customer not found.", statusCode: StatusCodes.NOT_FOUND, message: "Customer not found."});
        }

        //----> Send back response.
        return customer;

    }
}

export const customerService = new CustomerService() as ICustomerService;