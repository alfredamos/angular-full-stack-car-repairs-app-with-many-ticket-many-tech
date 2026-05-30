import {computed, inject, Injectable, signal} from '@angular/core';
import {AssignedTicketResponse} from "../../models/assignedTicketResponse.model";
import {BrowserStorageService} from "./browser-storage-service";
import {LocalStorageParam} from "../utils/localStorageParam.util";

@Injectable({
  providedIn: 'root',
})
export class AssignedTicketService {
  ticketsState = signal<AssignedTicketResponse[]>([]);
  tickets = computed(() => this.ticketsState.asReadonly()());

  localStore = inject(BrowserStorageService);

  updateTickets(tickets: AssignedTicketResponse[]) {
    this.setLocalStore(tickets);
    this.ticketsState.set(tickets);
  }

  addTicket(ticket: AssignedTicketResponse) {
    this.ticketsState.update(tickets => [...tickets, ticket]);
    this.setLocalStore(this.ticketsState());
  }

  deleteTicket(techId: string, ticketId: string) {
    this.ticketsState.update(tickets => tickets.filter(ticket => ticket.techId !== techId && ticket.ticketId !== ticketId));
    this.setLocalStore(this.ticketsState());
  }

  updateTicket(techId: string, ticketId: string, ticket: AssignedTicketResponse) {
    this.ticketsState.update(tickets => tickets.map(t => t.techId === techId && t.ticketId === ticketId ? ticket : t));
    this.setLocalStore(this.ticketsState());
  }

  clearTickets() {
    this.ticketsState.set([]);
  }

  getTicketById(techId: string, ticketId: string) {
    return this.ticketsState().find(ticket => ticket.techId === techId && ticket.ticketId === ticketId);
  }

  setLocalStore(tickets: AssignedTicketResponse[]) {
    localStorage.setItem(LocalStorageParam.assignTicketKey, JSON.stringify(tickets));
  }

  getLocalStore() {
    return JSON.parse(localStorage.getItem(LocalStorageParam.assignTicketKey) as string) as AssignedTicketResponse[];
  }

  removeLocalStore() {
    this.clearTickets();
    localStorage.removeItem(LocalStorageParam.assignTicketKey);
  }
}
