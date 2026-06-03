import {Component, inject, input} from "@angular/core";
import {TechDb} from "../../../services/tech-db";
import {AuthService} from "../../../services/auth-service";
import {Router} from "@angular/router";
import {TechnicianCreate as Tech} from "../../../../server/validations/technician.validation";
import {TechnicianCreateWithUser} from "../../../components/technician-create-with-user/technician-create-with-user";

@Component({
    selector: 'app-add-technician-by-user-id-page',
    imports: [TechnicianCreateWithUser],
    template: `
    <app-tech-create-with-user
        [userId]="userId()" 
        (onBackToList)="backToList()"
        (onCreateTech)="createTechnician($event)"
    />
    `,
})
export default class AddTechnicianByUserIdPage {
    userId = input.required<string>();

    authService = inject(AuthService);
    techDb = inject(TechDb);
    router = inject(Router);

    async backToList() {
        await this.router.navigate(['/technicians'])
    }

    async createTechnician(techCreate: Tech) {
        await this.techDb.createTechnician(techCreate);
        await this.router.navigate([`${this.authService.isAdmin() ? '/technicians' : '/'}`]);
    }
}