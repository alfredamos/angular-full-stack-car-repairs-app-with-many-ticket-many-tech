import {computed, inject, Injectable, signal} from '@angular/core';
import {UserSession} from "../../models/UserSession.model";
import {emptyUserSession} from "../../server/utils/emptyUserSession";
//import * as ls from "local-storage"
import {UserDto} from "../../models/userDto.model";
import {AuthParam} from "../../server/utils/authParam.util";
import {LocalStorageParam} from "../utils/localStorageParam.util";
import {BrowserStorageService} from "./browser-storage-service";

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

  setSession(session: UserSession) {
    this.setLocaLStore(session);
    this.authSessionState.set(session);
  }

  removeSession() {
    this.removeLocaLStore();
    this.authSessionState.set(emptyUserSession);
  }

  getSession() {
    return this.authSessionState();
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
