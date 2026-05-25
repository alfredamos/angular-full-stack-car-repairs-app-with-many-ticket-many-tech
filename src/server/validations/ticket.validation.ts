import {z} from "zod";

export const ticketCreateSchema = z.object({
    title: z.string().min(1, { message: "Title cannot be empty." }),
    description: z.string().min(1, { message: "Notes cannot be empty." }),
    customerId: z.string().min(1, { message: "CustomerId cannot be empty." }),

})

export type TicketCreate = z.infer<typeof ticketCreateSchema>;

export const ticketEditSchema = z.object({
    id: z.string().min(1, { message: "Title cannot be empty." }),
    title: z.string().min(1, { message: "Title cannot be empty." }),
    description: z.string().min(1, { message: "Notes cannot be empty." }),
    customerId: z.string().min(1, { message: "CustomerId cannot be empty." }),

})

export type TicketEdit = z.infer<typeof ticketEditSchema>;

export const ticketSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Title cannot be empty." }),
    notes: z.string().min(1, { message: "Notes cannot be empty." }),
    customerId: z.string().min(1, { message: "CustomerId cannot be empty." }),

})

export type Ticket = z.infer<typeof ticketSchema>;