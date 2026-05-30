import {inject, Injectable} from '@angular/core';
import { ApiHttpClientService } from "./api-client-service";
import {AssignedTicketCreate, AssignedTicketEdit} from "../../server/validations/assignedTicket.validation";
import {AssignedTicketResponse} from "../../models/assignedTicketResponse.model";
import {AssignedTicketService} from "./assigned-ticket-service";

@Injectable({
  providedIn: 'root',
})
export class AssignedTicketDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<AssignedTicketCreate | AssignedTicketEdit | null>;
  assignedTickets = inject(AssignedTicketService);

  async changeAssignedTicketStatus(techId: string, ticketId: string) {
    const response = await this.apiClient.patch<AssignedTicketResponse>(`/assign-tickets/change-status/${techId}/${ticketId}`, null);
    this.assignedTickets.updateTicket(techId, ticketId, response);

    return response;
  }

  async createAssignedTicket(assignedTicketCreate: AssignedTicketCreate) {
    const response = await this.apiClient.post<AssignedTicketResponse>('/assign-tickets', assignedTicketCreate);
    this.assignedTickets.addTicket(response);

    return response;
  }

  async deleteAssignedTicketById(techId: string, ticketId: string) {
    const response = await this.apiClient.delete<AssignedTicketResponse>(`/assign-tickets/${techId}/${ticketId}`);
    this.assignedTickets.deleteTicket(techId, ticketId);

    return response;
  }

  async editAssignedTicketById(techId: string, ticketId: string, assignedTicketEdit: AssignedTicketEdit) {
    const response = await this.apiClient.patch<AssignedTicketResponse>(`/assign-tickets/${techId}/${ticketId}`, assignedTicketEdit);
    this.assignedTickets.updateTicket(techId, ticketId, response);

    return response;
  }

  async getAssignedTicketById(techId: string, ticketId: string) {
    const response = await this.apiClient.get<AssignedTicketResponse>(`/assign-tickets/${techId}/${ticketId}`);
    this.assignedTickets.getTicketById(techId, ticketId);

    return response;
  }

  async getAssignedTicketsByStatus(status: string) {
    const response = await this.apiClient.get<AssignedTicketResponse[]>(`/assign-tickets/by-status/${status}`);
    this.assignedTickets.updateTickets(response);

    return response;
  }

  async getAssignedTicketsByTechId(techId: string) {
    const response = await this.apiClient.get<AssignedTicketResponse[]>(`/assign-tickets/by-tech-id/${techId}`);
    this.assignedTickets.updateTickets(response);

    return response;
  }

  async getAssignedTicketsByTicketId(ticketId: string) {
    const response = await this.apiClient.get<AssignedTicketResponse[]>(`/assign-tickets/by-ticket-id/${ticketId}`);
    this.assignedTickets.updateTickets(response);

    return response;
  }

}
