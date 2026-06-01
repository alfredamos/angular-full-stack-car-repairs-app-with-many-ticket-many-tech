import {Component, inject} from "@angular/core";
import {TechnicianCreate} from "../../../components/technician-create/technician-create";
import {TechnicianCreate as Tech} from "../../../../server/validations/technician.validation";
import {TechDb} from "../../../services/tech-db";
import {TechService} from "../../../services/tech-service";
import {httpResource} from "@angular/common/http";
import {UserDto} from "../../../../models/userDto.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-technician-page',
    imports: [TechnicianCreate],
    template: `
    <app-tech-create
        [users]="users.value()" 
        (onBackToList)="backToList()"
        (onCreateTech)="createTechnician($event)"
    />
    `,
})
export default class AddTechnicianPage {
    techDb = inject(TechDb)
    techService = inject(TechService);
    router = inject(Router);

    users = httpResource<UserDto[]>(() => '/api/users', {
        defaultValue: [],
    })

    async backToList() {
        await this.router.navigate(['/technicians'])
    }

    async createTechnician(techCreate: Tech) {
        await this.techDb.createTechnician(techCreate);
        await this.router.navigate(['/technicians'])
    }
}