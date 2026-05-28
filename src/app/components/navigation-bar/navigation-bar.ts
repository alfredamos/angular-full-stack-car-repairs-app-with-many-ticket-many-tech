import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthDb} from "../../services/auth-db";
import {AuthService} from "../../services/auth-service";
import {NgClass} from "@angular/common";
import {SettingsDropdown} from "../settings-dropdown/settings-dropdown";
import {AdminDropdown} from "../admin-dropdown/admin-dropdown";

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
    NgClass,
    SettingsDropdown,
    AdminDropdown
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  authDb = inject(AuthDb)
  authService = inject(AuthService);

  isMenuOpen = false;



  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  async onLogout() {
    await this.authDb.logoutUser()
  }

  async refreshUserToken(){
    return  await this.authDb.refreshUserToken()
  }
}
