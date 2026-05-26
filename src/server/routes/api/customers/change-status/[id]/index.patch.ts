import {createError, defineEventHandler, getRouterParam} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../../services/customer.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the id from the request parameters.
        const id = getRouterParam(event, 'id') as string;

        //----> Change customer status.
        return await customerService.changeCustomerStatus(id);
    }catch (err){
        const error = err as HttpError
        throw createError({statusCode: error?.statusCode, statusText: error?.message})
    }
})