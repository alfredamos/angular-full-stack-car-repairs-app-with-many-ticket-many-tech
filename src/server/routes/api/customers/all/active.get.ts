import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../services/customer.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Fetch active customers.
        return await customerService.getActiveCustomers();
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})