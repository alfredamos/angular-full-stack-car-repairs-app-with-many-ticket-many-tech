import {type TechnicianUncheckedCreateInput, type TechnicianUncheckedUpdateInput} from "../../generated/prisma/models/Technician";
import {TechnicianResponse} from "../../models/technicianResp.model";

export interface ITechnicianService {
    createTechnician(request: TechnicianUncheckedCreateInput): Promise<TechnicianResponse>;
    deleteTechnicianById(id: string): Promise<TechnicianResponse>;
    editTechnicianById(id: string, request: TechnicianUncheckedUpdateInput): Promise<TechnicianResponse>;
    getAllTechnicians(): Promise<TechnicianResponse[]>;
    getTechnicianById(id: string): Promise<TechnicianResponse>;
    getTechnicianBySpecialty(specialty: string): Promise<TechnicianResponse[]>;
    getTechnicianByUserId(userId: string): Promise<TechnicianResponse>;
}