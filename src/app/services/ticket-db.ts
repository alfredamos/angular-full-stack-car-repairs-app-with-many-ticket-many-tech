import {inject, Injectable} from '@angular/core';
import {TicketCreate, TicketEdit} from "../../server/validations/ticket.validation";
import {ApiHttpClientService} from "./api-client-service";
import {TicketResponse} from "../../models/ticketResponse.model";
import {TicketService} from "./ticket-service";

@Injectable({
  providedIn: 'root',
})
export class TicketDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<TicketCreate | TicketEdit | null>;
  ticketService = inject(TicketService);

  async createTicket(ticketCreate: TicketCreate) {
    try {
      const response = await this.apiClient.post<TicketResponse>("/tickets", ticketCreate);
      this.ticketService.addTicket(response);

      return response;
    }catch (err){
      console.log(" error-message in create-ticket, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async deleteTicketById(id: string) {
    try {
      const response = await this.apiClient.delete<TicketResponse>(`/tickets/${id}`);
      this.ticketService.deleteTicketById(id);

      return response;
    }catch (err){
      console.log(" error-message in delete-ticket-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  async editTicketById(id: string, ticketEdit: TicketEdit) {
    try {
      const response = await this.apiClient.patch<TicketResponse>(`/tickets/${id}`, ticketEdit);
      this.ticketService.updateTicket(response);

      return response;
    }catch (err){
      console.log(" error-message in edit-ticket-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }
  }

}
