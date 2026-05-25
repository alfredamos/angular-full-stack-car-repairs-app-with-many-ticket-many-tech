import {z} from "zod"

export const technicianCreateWithoutUserIdSchema = z.object({
    specialty: z.string().min(1, {message: "Speciality is required"}),
});

export type TechnicianWithoutUserIdCreate = z.infer<typeof technicianCreateWithoutUserIdSchema>;

export const technicianCreateSchema = z.object({
    specialty: z.string().min(1, {message: "Speciality is required"}),
    userId: z.string().min(6, {message: "User Id must be at least 6 characters long"}),
});

export type TechnicianCreate = z.infer<typeof technicianCreateSchema>;


export const technicianEditSchema = z.object({
    id: z.string().min(1, {message: "Id is required"}),
    specialty: z.string().min(1, {message: "Specialty is required"}),
    userId: z.string().min(6, {message: "User Id must be at least 6 characters long"}),
});

export type TechnicianEdit = z.infer<typeof technicianEditSchema>;