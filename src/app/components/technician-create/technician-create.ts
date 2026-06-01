import {Component, input, OnInit, output, signal} from '@angular/core';
import {TechnicianCreate as Tech} from "../../../server/validations/technician.validation";
import {form, FormField, required} from "@angular/forms/signals";
import {UserDto} from "../../../models/userDto.model";

@Component({
  selector: 'app-tech-create',
  imports: [
    FormField
  ],
  templateUrl: './technician-create.html',
  styleUrl: './technician-create.css',
})
export class TechnicianCreate implements OnInit{
  users = input.required<UserDto[]>();

  onCreateTech = output<Tech>();
  onBackToList = output<void>();

  techCreateModel = signal<Tech>({
    specialty: "",
    userId: ""
  });

  techCreateForm = form(this.techCreateModel, (schemaPath)=> {
    required(schemaPath.specialty, {message: "Specialty is required"});
    required(schemaPath.userId, {message: "UserId is required"});
  });

  ngOnInit() {
    this.users();
  }

  submitCustomerCreateForm($event: Event) {
    $event.preventDefault();
    this.onCreateTech.emit(this.techCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }
}
