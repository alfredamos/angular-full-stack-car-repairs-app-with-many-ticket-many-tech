import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-admin-dropdown',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-dropdown.html',
  styleUrl: './admin-dropdown.css',
})
export class AdminDropdown {
  authService = inject(AuthService);
}
