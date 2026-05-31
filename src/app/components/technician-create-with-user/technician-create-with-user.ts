import {Component, input, output, signal} from '@angular/core';
import {TechnicianCreate as Tech} from "../../../server/validations/technician.validation";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-technician-create-with-user',
  imports: [
    FormField
  ],
  templateUrl: './technician-create-with-user.html',
  styleUrl: './technician-create-with-user.css',
})
export class TechnicianCreateWithUser {
  userId = input.required<string>();

  onCreateTech = output<Tech>();
  onBackToList = output<void>();

  techCreateModel = signal<Tech>({
    specialty: "",
    userId: this.userId()
  });

  techCreateForm = form(this.techCreateModel, (schemaPath)=> {
    required(schemaPath.specialty, {message: "Specialty is required"});
    required(schemaPath.userId, {message: "UserId is required"});
  });

  submitCustomerCreateForm($event: Event) {
    $event.preventDefault();
    this.onCreateTech.emit(this.techCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }
}
