import {z} from 'zod'
import {Status} from "../generated/prisma/enums";

export const assignedTicketCreateSchema = z.object({
    ticketId: z.string().min(1, {message: 'Ticket Id cannot be empty.'}),
    techId: z.string().min(1, {message: 'Tech Id cannot be empty.'}),
    assignBy: z.string().min(1, {message: 'AssignBy cannot be empty.'}),
});

export type AssignedTicketCreate = z.infer<typeof assignedTicketCreateSchema>;

export const assignedTicketEditSchema = z.object({
    ticketId: z.string().min(1, {message: 'Ticket Id cannot be empty.'}),
    techId: z.string().min(1, {message: 'Tech Id cannot be empty.'}),
    assignBy: z.string().optional(),
    status: z.enum(Status),
    completed: z.boolean().optional(),
});

export type AssignedTicketEdit = z.infer<typeof assignedTicketEditSchema>;

