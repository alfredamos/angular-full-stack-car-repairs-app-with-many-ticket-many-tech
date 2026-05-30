import {Component} from "@angular/core";
import {TechnicianTable} from "../../components/technician-table/technician-table";
import {TechnicianResponse} from "../../../models/technicianResp.model";
import {httpResource} from "@angular/common/http";

@Component({
    selector: 'app-technicians-list-page',
    imports: [TechnicianTable],
    template: `
    <app-technician-table
        [technicians]="technicians.value() || []"       
    />
    `,
    standalone: true
})
export default class TechniciansPage{
    technicians = httpResource<TechnicianResponse[]>(() => '/api/technicians');
}