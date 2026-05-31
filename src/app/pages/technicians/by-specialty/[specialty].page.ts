import {Component, input} from "@angular/core";
import {TechnicianTable} from "../../../components/technician-table/technician-table";
import {httpResource} from "@angular/common/http";
import {TechnicianResponse} from "../../../../models/technicianResp.model";

@Component({
    selector: 'app-technicians-by-specialty',
    imports: [TechnicianTable],
    template: `
        <app-technician-table
                [technicians]="technicians.value()"
        />
    `
})
export default class TechniciansBySpecialty {
    specialty = input.required<string>();

    technicians = httpResource<TechnicianResponse[]>(() => `/api/technicians/by-specialty/${this.specialty()}`,{
        defaultValue: []
    })
}