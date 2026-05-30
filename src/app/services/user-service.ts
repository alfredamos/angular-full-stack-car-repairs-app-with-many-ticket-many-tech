import {Injectable, signal, inject, computed} from '@angular/core';
import {UserDto} from "../../models/userDto.model";
import {BrowserStorageService} from "./browser-storage-service";
import {LocalStorageParam} from "../utils/localStorageParam.util";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersState = signal<UserDto[]>([]);
  users = computed(() => this.usersState.asReadonly()() || this.getLocalStore());

  localStore = inject(BrowserStorageService);

  updateUsers(users: UserDto[]) {
    this.setLocalStore(users);
    this.usersState.set(users);
  }

  deleteUser(id: string) {
    this.usersState.update(users => users.filter(user => user.id !== id));
    this.setLocalStore(this.usersState());
  }

  updateUser(user: UserDto) {
    this.usersState.update(users => users.map(u => u.id === user.id ? user : u));
    this.setLocalStore(this.usersState());
  }

  clearUsers() {
    this.usersState.set([]);
    this.setLocalStore(this.usersState());
  }

  getUserById(id: string) {
    return this.usersState().find(user => user.id === id);
  }

  setLocalStore(users: UserDto[]) {
    this.localStore.set(LocalStorageParam.userKey, JSON.stringify(users));
  }

  getLocalStore() {
    this.clearUsers();
    return JSON.parse(this.localStore.get(LocalStorageParam.userKey) as string) as UserDto[];
  }

  removeLocalStore() {
    this.localStore.remove(LocalStorageParam.userKey)
  }
}
