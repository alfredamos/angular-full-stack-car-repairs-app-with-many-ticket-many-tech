import {Component, inject, input, signal} from "@angular/core";
import {TicketDetail} from "../../../components/ticket-detail/ticket-detail";
import {httpResource} from "@angular/common/http";
import {TicketResponse} from "../../../../models/ticketResponse.model";
import {TicketService} from "../../../services/ticket-service";
import {TicketDb} from "../../../services/ticket-db";
import {Router} from "@angular/router";

@Component({
    selector: 'app-ticket-detail-page',
    imports: [TicketDetail],
    template: `
    <app-ticket-detail
            [ticket]="ticket.value()"
            [isModalOpen]="isModalOpen()"
            (onOpenModal)="openModal()"
            (onCloseModal)="closeModal()"
            (onDeleteTicket)="deleteTicket($event)"
    />`,
})
export default class TicketDetailPage {
    id = input.required<string>();

    isModalOpen = signal(false);

    ticket = httpResource<TicketResponse>(() => `/api/tickets/${this.id()}`, {
        defaultValue: new TicketResponse(),
    });

    ticketDb = inject(TicketDb);
    ticketService = inject(TicketService);
    router = inject(Router);

    openModal() {
        this.isModalOpen.set(true);
    }

    closeModal() {
        this.isModalOpen.set(false);
    }

    async deleteTicket(id: string) {
        await this.ticketDb.deleteTicketById(id);
        this.ticketService.updateTickets(this.ticketService.tickets());

        await this.router.navigate(['/tickets']);
    }
}