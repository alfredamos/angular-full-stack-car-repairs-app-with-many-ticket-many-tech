import {Component, inject, signal, input} from "@angular/core";
import {EditTechnician} from "../../../components/edit-technician/edit-technician";
import {TechInputEdit} from "../../../../models/techInputEdit.model";
import {TechDb} from "../../../services/tech-db";
import {httpResource} from "@angular/common/http";
import {Router} from "@angular/router";
import {TechnicianResponse} from "../../../../models/technicianResp.model";
import {TechnicianEdit} from "../../../../server/validations/technician.validation";

@Component({
    selector: 'app-edit-technician-page',
    imports: [EditTechnician],
    template: `
    <app-edit-technician
        [techInput]="techInput()" 
        (onBackToList)="backToList()"
        (onEditTech)="submitEditTechForm($event)"
    />
    `,
})
export default class EditTechnicianPage {
    id = input.required<string>();

    techInput = signal<TechInputEdit>(new TechInputEdit())

    techDb = inject(TechDb);
    router = inject(Router)

    techResponse = httpResource(() => `/api/technicians/${this.id()}`, {
        defaultValue: new TechnicianResponse(),
        parse: (value) => {
            const tech = value as TechnicianResponse;
            this.techInput.set({specialty: tech.specialty})
            return tech;
        }
    });


    async backToList() {
        await this.router.navigate(['/technicians'])
    }

    async submitEditTechForm(techInput: TechInputEdit) {
        const techEdit = this.toTechnicianEdit(techInput)
        await this.techDb.editTechnicianById(this.id(), techEdit);
        await this.router.navigate(['/technicians'])
    }

    toTechnicianEdit(techInput: TechInputEdit) {
        const techEdit : TechnicianEdit = {id: this.id(), specialty: techInput.specialty, userId: this.techResponse.value().userId};

        return techEdit;
    }
}