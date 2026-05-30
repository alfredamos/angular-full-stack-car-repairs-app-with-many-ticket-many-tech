import {computed, inject, Injectable, signal} from '@angular/core';
import {TechnicianResponse} from "../../models/technicianResp.model";
import {LocalStorageParam} from "../utils/localStorageParam.util";
import {BrowserStorageService} from "./browser-storage-service";

@Injectable({
  providedIn: 'root',
})
export class TechService {
  localStore = inject(BrowserStorageService);
  techsState = signal<TechnicianResponse[]>([]);
  techs = computed(() => this.techsState.asReadonly()() || this.getLocalStore());

  updateTechs(techs: TechnicianResponse[]) {
    this.setLocalStore(techs);
    this.techsState.set(techs);
  }

  addTech(tech: TechnicianResponse) {
    this.techsState.update(techs => [...techs, tech]);
    this.setLocalStore(this.techsState());
  }

  deleteTechById(id: string) {
    this.techsState.update(techs => techs.filter(tech => tech.id !== id));
    this.setLocalStore(this.techsState());
  }

  updateTech(tech: TechnicianResponse) {
    this.techsState.update(techs => techs.map(t => t.id === tech.id ? tech : t));
    this.setLocalStore(this.techsState());
  }

  clearTechs() {
    this.techsState.set([]);
  }

  getTechById(id: string) {
    return this.techsState().find(tech => tech.id === id);
  }

  getTechByUserId(userId: string) {
    return this.techsState().find(tech => tech.userId === userId);
  }

  setLocalStore(techs: TechnicianResponse[]) {
    localStorage.setItem(LocalStorageParam.techKey, JSON.stringify(techs));
  }

  getLocalStore() {
    return JSON.parse(localStorage.getItem(LocalStorageParam.techKey) as string) as TechnicianResponse[];
  }

  removeLocalStore() {
    this.clearTechs();
    localStorage.removeItem(LocalStorageParam.techKey);
  }
}
