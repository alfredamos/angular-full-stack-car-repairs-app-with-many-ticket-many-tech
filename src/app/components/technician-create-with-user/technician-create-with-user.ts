import {Component, input, output, signal, OnInit, OnChanges} from '@angular/core';
import {TechnicianCreate as Tech} from "../../../server/validations/technician.validation";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-tech-create-with-user',
  imports: [
    FormField
  ],
  templateUrl: './technician-create-with-user.html',
  styleUrl: './technician-create-with-user.css',
})
export class TechnicianCreateWithUser implements OnInit, OnChanges{
  userId = input.required<string>();

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

  ngOnInit(): void {
    this.techCreateModel.set({
      specialty: "",
      userId: this.userId()
    });
  }

  ngOnChanges(): void {
    this.techCreateModel.set({
      specialty: "",
      userId: this.userId()
    });
  }

  submitCustomerCreateForm($event: Event) {
    $event.preventDefault();
    this.onCreateTech.emit(this.techCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }
}
