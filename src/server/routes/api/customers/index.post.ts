import {createError, defineEventHandler, readValidatedBody} from "h3";
import {HttpError} from "http-errors"
import {customerCreateSchema} from "../../../validations/customer.validation";
import {customerService} from "../../../services/customer.service";

export default defineEventHandler(async (event) => {
    try {
        //----> Get the payload from the request body.
        const customer = await readValidatedBody(event, customerCreateSchema.parse);

        //----> Insert the customer into the database.
        return await customerService.createCustomer(customer);
    }catch (err){
        const error = err as HttpError;
        throw createError({statusCode: error?.statusCode, message: error?.message});
    }
})