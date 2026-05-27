import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../services/customer.service";
import {adminAuthorization} from "../../../../utils/adminAuthorization";

export default defineEventHandler(async (event) => {
    try {
        //----> Check for admin role.
        adminAuthorization(event);

        //----> Get the customer id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Delete customer with the giving id.
        return await customerService.deleteCustomerById(id);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})