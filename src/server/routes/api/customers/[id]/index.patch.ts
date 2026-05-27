import {createError, defineEventHandler, getRouterParam, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../services/customer.service";
import {customerEditSchema} from "../../../../validations/customer.validation";
import {adminAuthorization} from "../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the payload from the request body.
        const customer = await readValidatedBody(event, customerEditSchema.parse);

        //----> Get the customer id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Edit customer with the giving id.
        return await customerService.editCustomerById(id, customer);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})