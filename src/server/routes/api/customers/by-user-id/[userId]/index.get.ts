import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../../services/customer.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the user id from the request parameters.
        const userId = getRouterParam(event, 'userId') as string;

        //----> Fetch customer with the giving user id.
        return await customerService.getCustomerByUserId(userId);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})