import { StatusCodes } from "http-status-codes";
import { ZodType } from "zod";
import catchError from "http-errors";

export function validateWithZodSchema<T>(
    schema: ZodType<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw catchError(StatusCodes.BAD_REQUEST, `${result.error.message}`);
    }

    return result.data;
}
