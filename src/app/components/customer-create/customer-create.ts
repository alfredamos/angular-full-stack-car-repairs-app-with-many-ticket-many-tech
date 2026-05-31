import {Component, input, OnInit, output, signal} from '@angular/core';
import {UserDto} from "../../../models/userDto.model";
import {CustomerCreate as Customer} from "../../../server/validations/customer.validation";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-customer-create',
  imports: [
    FormField
  ],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css',
})
export class CustomerCreate implements OnInit{
  users = input.required<UserDto[]>();

  onCreateCustomer = output<Customer>();
  onBackToList = output<void>();

  customerCreateModel = signal<Customer>({
    active: true,
    address: "",
    notes: "",
    userId: ""
  });

  ngOnInit() {
    this.users();
  }

  customerCreateForm = form(this.customerCreateModel, (schemaPath)=> {
    required(schemaPath.address, {message: "Address is required"});
    required(schemaPath.notes, {message: "Notes is required"});
    required(schemaPath.userId, {message: "UserId is required"});
  });

  submitCustomerCreateForm($event: Event) {
    $event.preventDefault();
    this.onCreateCustomer.emit(this.customerCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }


}
