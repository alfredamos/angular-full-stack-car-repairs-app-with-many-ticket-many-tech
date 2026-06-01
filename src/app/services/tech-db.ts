import {inject, Injectable} from '@angular/core';
import {TechnicianResponse} from "../../models/technicianResp.model";
import {ApiHttpClientService} from "./api-client-service";
import {TechService} from "./tech-service";
import {TechnicianCreate, TechnicianEdit} from "../../server/validations/technician.validation";

@Injectable({
  providedIn: 'root',
})
export class TechDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<TechnicianCreate | TechnicianEdit | null>;
  techService = inject(TechService);

  async createTechnician(technicianCreate: TechnicianCreate) {
    try {
      const response = await this.apiClient.post<TechnicianResponse>('/technicians', technicianCreate);
      this.techService.addTech(response);

      return response;
    }catch (err){
      console.log(" error-message in create-technician, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async deleteTechnicianById(id: string) {
    try {
      const response = await this.apiClient.delete<TechnicianResponse>(`/technicians/${id}`);
      this.techService.deleteTechById(id)

      return response;
    }catch (err){
      console.log(" error-message in delete-technician-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async editTechnicianById(id: string, technicianEdit: TechnicianEdit) {
    try {
      const response = await this.apiClient.patch<TechnicianResponse>(`/technicians/${id}`, technicianEdit);
      this.techService.updateTech(response);

      return response;
    }catch (err){
      console.log(" error-message in edit-technician-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")

    }
  }

}
