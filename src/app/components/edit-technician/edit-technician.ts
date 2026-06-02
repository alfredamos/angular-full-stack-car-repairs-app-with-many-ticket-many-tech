import { Component, input, signal, output, OnInit, OnChanges } from '@angular/core';
import {form, required, FormField} from "@angular/forms/signals";
import {TechnicianCreate as Tech} from "../../../server/validations/technician.validation";
import {TechInputEdit} from "../../../models/techInputEdit.model";

@Component({
  selector: 'app-edit-technician',
  imports: [FormField],
  templateUrl: './edit-technician.html',
  styleUrl: './edit-technician.css',
})
export class EditTechnician implements OnInit, OnChanges{
  techInput = input.required<TechInputEdit>();
  onEditTech = output<TechInputEdit>();
  onBackToList = output<void>();

  techEditModel = signal<TechInputEdit>({
    specialty: "",
  });

  techEditForm = form(this.techEditModel, (schemaPath)=> {
    required(schemaPath.specialty, {message: "Specialty is required"});
  });

  ngOnInit() {
    this.loadTech();
  }

  ngOnChanges() {
    this.loadTech();
  }

  submitCustomerEditForm($event: Event) {
    $event.preventDefault();
    this.onEditTech.emit(this.techEditModel())
  }

  backToList() {
    this.onBackToList.emit();
  }

  loadTech(){
    this.techInput();
    this.techEditModel.set(this.techInput());
  }
}
