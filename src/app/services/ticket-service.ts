import {computed, Injectable, signal} from '@angular/core';
import {TicketResponse} from "../../models/ticketResponse.model";
import {LocalStorageParam} from "../utils/localStorageParam.util";

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private ticketsState = signal<TicketResponse[]>([]);
  tickets = computed(() => this.ticketsState.asReadonly()() || this.getLocalStore());

  updateTickets(tickets: TicketResponse[]) {
    this.setLocalStore(tickets);
    this.ticketsState.set(tickets);
  }

  addTicket(ticket: TicketResponse) {
    this.ticketsState.update(tickets => [...tickets, ticket]);
    this.setLocalStore(this.ticketsState());
  }

  deleteTicketById(id: string) {
    this.ticketsState.update(tickets => tickets.filter(ticket => ticket.id !== id));
    this.setLocalStore(this.ticketsState());
  }

  updateTicket(ticket: TicketResponse) {
    this.ticketsState.update(tickets => tickets.map(t => t.id === ticket.id ? ticket : t));
    this.setLocalStore(this.ticketsState());
  }

  clearTickets() {
    this.ticketsState.set([]);
    this.setLocalStore(this.ticketsState());
  }

  getTicketById(id: string) {
    return this.ticketsState().find(ticket => ticket.id === id);
  }

  getTicketsByCustomerId(customerId: string) {
    return this.ticketsState().filter(ticket => ticket.customerId === customerId);
  }

  setLocalStore(tickets: TicketResponse[]) {
    localStorage.setItem(LocalStorageParam.ticketKey, JSON.stringify(tickets));
  }

  getLocalStore() {
    return JSON.parse(localStorage.getItem(LocalStorageParam.ticketKey) as string) as TicketResponse[];
  }

  removeLocalStore() {
    this.clearTickets();
    localStorage.removeItem(LocalStorageParam.ticketKey)
  }

}
