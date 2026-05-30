import {computed, inject, Injectable, signal} from '@angular/core';
import {UserSession} from "../../models/UserSession.model";
import {emptyUserSession} from "../../server/utils/emptyUserSession";
//import * as ls from "local-storage"
import {UserDto} from "../../models/userDto.model";
import {AuthParam} from "../../server/utils/authParam.util";
import {LocalStorageParam} from "../utils/localStorageParam.util";
import {BrowserStorageService} from "./browser-storage-service";
import {CustomerService} from "./customer-service";
import {UserService} from "./user-service";
import {TicketService} from "./ticket-service";
import {TechService} from "./tech-service";
import {AssignedTicketService} from "./assigned-ticket-service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSessionState = signal<UserSession>(emptyUserSession);
  authSession = this.authSessionState.asReadonly();

  accessToken = computed(() => this.authSession()?.accessToken || this.getLocalStore()?.accessToken)
  id = computed(() => this.authSession()?.id || this.getLocalStore()?.id);
  isAdmin = computed(() => this.authSession()?.isAdmin || this.getLocalStore()?.isAdmin);
  isLoggedIn = computed(() => this.authSession()?.isLoggedIn || this.getLocalStore()?.isLoggedIn);
  email = computed(() => this.authSession()?.email || this.getLocalStore()?.email);

  ls = inject(BrowserStorageService);
  assignedTicket = inject(AssignedTicketService);
  customerService = inject(CustomerService);
  techService = inject(TechService);
  ticketsService = inject(TicketService);
  userService = inject(UserService);

  setSession(session: UserSession) {
    this.setLocaLStore(session);
    this.authSessionState.set(session);
  }

  removeSession() {
    this.removeLocaLStore();
    this.assignedTicket.removeLocalStore();
    this.customerService.removeLocalStore();
    this.techService.removeLocalStore();
    this.ticketsService.removeLocalStore();
    this.userService.removeLocalStore();
    this.authSessionState.set(emptyUserSession);
  }

  setLocaLStore(value: UserSession) {
    this.ls.set(LocalStorageParam.authKey, JSON.stringify(value));
  }

  removeLocaLStore() {
    this.ls.remove(LocalStorageParam.authKey)
  }

  getLocalStore() {
    return JSON.parse(this.ls.get(LocalStorageParam.authKey) as string ) as UserSession;
  }
}
