import {createError, defineEventHandler} from "h3";
import {HttpError} from "http-errors"
import {customerService} from "../../../../services/customer.service";

export default defineEventHandler(async (_event) => {
    try {
        //----> Fetch inactive customers.
        return await customerService.getInactiveCustomers();
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})