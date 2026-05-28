import {Component, output, signal} from '@angular/core';
import {SignupUser} from "../../../../server/validations/auth.validation";
import {email, form, FormField, required} from "@angular/forms/signals";
import {Gender} from "../../../../models/Gender.model";
import {UserType} from "../../../../models/UserType.model";

@Component({
  selector: 'app-signup-form',
  imports: [
    FormField
  ],
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.css',
})
export class SignupForm {
  onSignup= output<SignupUser>();
  onBackToList = output<void>()

  signupUserModel = signal<SignupUser>({
    email: "",
    name: "",
    image: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: Gender.Male,
    dateOfBirth: "",
    userType: UserType.Customer
  });

  signupUserForm = form(this.signupUserModel, (schemaPath)=> {
    required(schemaPath.email, {message: 'Email is required'});
    email(schemaPath.email, {message: 'Enter a valid email address'});
    required(schemaPath.name, {message: "Name is required"});
    required(schemaPath.image, {message: "Image is required"});
    required(schemaPath.confirmPassword, {message: "Confirm Password is required"});
    required(schemaPath.password, {message: "Password is required"});
    required(schemaPath.phone, {message: "Phone is required"});
  })

  onSubmit($event: Event) {
    $event.preventDefault();
    console.log("In signup-form-component, signupUserPayload : ", this.signupUserModel())
    this.onSignup.emit(this.signupUserModel())
  }

  backToList() {
    this.onBackToList.emit()
  }
}
