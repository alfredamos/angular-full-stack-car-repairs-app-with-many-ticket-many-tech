import {Component, input, signal, inject, computed} from "@angular/core";
import {Router} from "@angular/router";
import {httpResource} from "@angular/common/http";
import {AssignedTicketDetail} from "../../../../components/assigned-ticket-detail/assigned-ticket-detail";
import {AuthService} from "../../../../services/auth-service";
import {AssignedTicketResponse} from "../../../../../models/assignedTicketResponse.model";
import {AssignedTicketService} from "../../../../services/assigned-ticket-service";
import {AssignedTicketDb} from "../../../../services/assigned-ticket-db";

@Component({
    selector: 'app-assigned-ticket-detail-page',
    imports: [AssignedTicketDetail],
    template: `
    <app-assigned-ticket-detail
          [isAdmin]="isAdmin()"
          [isModalOpen]="isModalOpen()"
          [ticket]="ticket.value()"
          (onCloseModal)="closeModal()"
          (onDeleteAssignedTicket)="deleteAssignedTicket($event)"
          (onOpenModal)="openModal()"
    />
    `
})
export default class AssignedTicketDetailPage {
    techId = input.required<string>();
    ticketId = input.required<string>();

    isModalOpen = signal(false);

    ticket = httpResource<AssignedTicketResponse>(() => `/api/assign-tickets/${this.techId()}/${this.ticketId()}`, {
        defaultValue: new AssignedTicketResponse(),
    });

    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);
    router = inject(Router)

    authService = inject(AuthService);

    isAdmin = computed(() => this.authService.isAdmin());

    protected closeModal() {
        this.isModalOpen.set(false);
    }

    async deleteAssignedTicket(ticketId: { techId: string; ticketId: string }) {
        await this.ticketDb.deleteAssignedTicketById(ticketId.techId, ticketId.ticketId);
        this.ticketService.updateTickets(this.ticketService.tickets());
        await this.router.navigate(['/assign-tickets']);
    }

    protected openModal() {
        this.isModalOpen.set(true);
    }
}