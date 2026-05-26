import { TechnicianUncheckedCreateInput, TechnicianUncheckedUpdateInput } from "src/generated/prisma/models";
import {TechnicianResponse, toTechnicianResponse} from "src/models/technicianResp.model";
import {ITechnicianService} from "./ITech.service";
import {prisma} from "../db/prisma.db";
import {createError} from "h3";
import {StatusCodes} from "http-status-codes";

class TechnicianService implements ITechnicianService {
    async createTechnician(request: TechnicianUncheckedCreateInput): Promise<TechnicianResponse> {
        //----> Insert the new technician into database.
        const technician = await prisma.technician.create({data: request, include: {user: true}});

        //----> Send back response.
        return toTechnicianResponse(technician);
    }

    async deleteTechnicianById(id: string): Promise<TechnicianResponse> {
        //----> Check for existence of technician.
        await this.getOneTechnician(id);

        //----> Delete the technician.
        const deletedTechnician = await prisma.technician.delete({where: {id}, include: {user: true}});

        //----> Send back response.
        return toTechnicianResponse(deletedTechnician);
    }

    async editTechnicianById(id: string, request: TechnicianUncheckedUpdateInput): Promise<TechnicianResponse> {
        //----> Check for existence of technician.
        await this.getOneTechnician(id);

        //----> Update the technician.
        const updatedTechnician = await prisma.technician.update({where: {id}, data: request, include: {user: true}});

        //----> Send back response.
        return toTechnicianResponse(updatedTechnician);
    }

   async  getAllTechnicians(): Promise<TechnicianResponse[]> {
        //----> Fetch all technicians.
        const technicians = await prisma.technician.findMany({include: {user: true}});

        //----> Send back response.
       return technicians?.map(tech => toTechnicianResponse(tech))
    }

    async getTechnicianById(id: string): Promise<TechnicianResponse> {
        //----> Fetch technician by id.
        const technician = await this.getOneTechnician(id);

        //----> Send back response.
        return toTechnicianResponse(technician);
    }

    async getTechnicianBySpecialty(specialty: string): Promise<TechnicianResponse[]> {
        //----> Fetch all technicians.
        const technicians = await prisma.technician.findMany({where: {specialty}, include: {user: true}});

        //----> Send back response.
        return technicians?.map(tech => toTechnicianResponse(tech))
    }

    async getTechnicianByUserId(userId: string): Promise<TechnicianResponse> {
        //----> Fetch technician by user id.
        const technician = await prisma.technician.findUnique({where: {userId}, include: {user: true}});

        //----> Check for null technician.
        if (!technician) throw createError({statusText: "Technician not found.", statusCode: StatusCodes.NOT_FOUND});

        //----> Send back response.
        return toTechnicianResponse(technician);
    }

    private async getOneTechnician(id: string) {
        //----> Fetch technician by id
        const technician = await prisma.technician.findUnique({where: {id}, include: {user: true}});

        //----> Check for null technician.
        if (!technician) throw createError({statusText: "Technician not found.", statusCode: StatusCodes.NOT_FOUND});

        //----> Return technician
        return technician;
    }
}

export const techService = new TechnicianService() as ITechnicianService;