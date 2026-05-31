import {Component, inject, input} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {TechnicianResponse} from "../../../models/technicianResp.model";
import {RouterLink} from "@angular/router";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-technician-table',
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './technician-table.html',
  styleUrl: './technician-table.css',
})
export class TechnicianTable {
  authService = inject( AuthService);
  technicians = input.required<TechnicianResponse[]>()
}
