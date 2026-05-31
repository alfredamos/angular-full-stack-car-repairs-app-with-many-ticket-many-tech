import {Component, inject, input, signal} from "@angular/core";
import {TechnicianDetail} from "../../../components/technician-detail/technician-detail";
import {httpResource} from "@angular/common/http";
import {TechnicianResponse} from "../../../../models/technicianResp.model";
import {TechDb} from "../../../services/tech-db";
import {TechService} from "../../../services/tech-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-detail-page',
    imports: [TechnicianDetail],
    template: `
    <app-technician-detail 
        [tech]="tech.value()"
        [isModalOpen]="isModalOpen()"
        (onOpenModal)="openModal()" 
        (onCloseModal)="closeModal()"
        (onDeleteTechnician)="deleteTechnician($event)"
    />`,
})
export default class DetailPage {
    id = input.required<string>();

    isModalOpen = signal(false);

    tech = httpResource<TechnicianResponse>(() => `/api/technicians/${this.id()}`,{
        defaultValue: new TechnicianResponse(),
    });

    techDb = inject(TechDb);
    techService = inject(TechService);
    router = inject(Router);

    openModal() {
        this.isModalOpen.set(true);
    }

    closeModal() {
        this.isModalOpen.set(false);
    }

    async deleteTechnician(id: string) {
        await this.techDb.deleteTechnicianById(id);
        this.techService.updateTechs(this.techService.techs());

        await this.router.navigate(['/technicians'])
    }
}