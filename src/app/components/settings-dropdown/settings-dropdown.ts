import {Component, computed, inject, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-settings-dropdown',
  imports: [
    RouterLink
  ],
  templateUrl: './settings-dropdown.html',
  styleUrl: './settings-dropdown.css',
})
export class SettingsDropdown {
  authService = inject(AuthService);
  id = computed(() =>  this.authService.id())

  onRefreshUserToken = output<void>();

  refreshUserToken() {
    this.onRefreshUserToken.emit();
  }
}
