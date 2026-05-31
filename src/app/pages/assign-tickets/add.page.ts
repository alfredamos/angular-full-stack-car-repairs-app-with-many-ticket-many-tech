import {Component, inject} from "@angular/core";
import {AssignedTicketCreate} from "../../components/assigned-ticket-create/assigned-ticket-create";
import {httpResource} from "@angular/common/http";
import {TechnicianResponse} from "../../../models/technicianResp.model";
import {TicketResponse} from "../../../models/ticketResponse.model";
import {AssignedTicketService} from "../../services/assigned-ticket-service";
import {AssignedTicketDb} from "../../services/assigned-ticket-db";
import {AssignedTicketCreate as Ticket} from "../../../server/validations/assignedTicket.validation";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-assigned-ticket-page',
    imports: [AssignedTicketCreate],
    template: `
    <app-assigned-ticket-create
        [techs]="techs.value()"
        [tickets]="tickets.value()"       
        (onBackToList)="backToList()"
        (onTicketCreate)="submitTicketCreateForm($event)"
    />
    `
})
export default class AddAssignedTicketPage {
    ticketDb = inject(AssignedTicketDb);
    ticketService = inject(AssignedTicketService);
    router = inject(Router);

    techs = httpResource<TechnicianResponse[]>(() => '/api/technicians',{
        defaultValue: []
    });

    tickets = httpResource<TicketResponse[]>(() => '/api/tickets',{
        defaultValue: []
    });

    async backToList() {
        await this.router.navigate(['/assign-tickets',])
    }

    async submitTicketCreateForm(ticket: Ticket) {
        await this.ticketDb.createAssignedTicket(ticket);
        await this.router.navigate(['/assign-tickets'])
    }
}