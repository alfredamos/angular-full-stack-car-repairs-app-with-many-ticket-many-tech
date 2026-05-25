import {z} from "zod";


export const customerCreateWithoutUserIdSchema = z.object({
    active: z.boolean().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    notes: z.string().min(1, { message: "Note cannot be empty." }),
});

export type CustomerWithoutUserIdCreate = z.infer<typeof customerCreateWithoutUserIdSchema>;

export const customerCreateSchema = z.object({
    active: z.boolean().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    userId: z.string().min(1, { message: "User Id cannot be empty." }),
    notes: z.string().min(1, { message: "Note cannot be empty." }),
});

export type CustomerCreate = z.infer<typeof customerCreateSchema>


export const customerEditSchema = z.object({
    id: z.string().optional(),
    active: z.boolean().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    userId: z.string().optional(),
    notes: z.string().min(1, { message: "Note cannot be empty." }),
});

export type CustomerEdit = z.infer<typeof customerEditSchema>

export const customerSchema = z.object({
    id: z.string().optional(),
    active: z.boolean().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    userId: z.string().optional(),
    notes: z.string().min(1, { message: "Note cannot be empty." }),
});

export type Customer = z.infer<typeof customerSchema>
