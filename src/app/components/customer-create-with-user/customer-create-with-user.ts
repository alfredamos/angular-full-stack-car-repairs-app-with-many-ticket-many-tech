import {Component, input, output, signal, OnChanges, OnInit} from '@angular/core';
import {CustomerCreate as Customer} from "../../../server/validations/customer.validation";
import {form, FormField, required} from "@angular/forms/signals";

@Component({
  selector: 'app-customer-create-with-user',
  imports: [
    FormField
  ],
  templateUrl: './customer-create-with-user.html',
  styleUrl: './customer-create-with-user.css',
})
export class CustomerCreateWithUser implements OnInit, OnChanges{
  userId = input.required<string>();

  onCreateCustomer = output<Customer>();
  onBackToList = output<void>();

  customerCreateModel = signal<Customer>({
    active: true,
    address: "",
    notes: "",
    userId: ""
  });

  customerCreateForm = form(this.customerCreateModel, (schemaPath)=> {
    required(schemaPath.address, {message: "Address is required"});
    required(schemaPath.notes, {message: "Notes is required"});
    required(schemaPath.userId, {message: "UserId is required"});
  });

  ngOnInit(): void {
    this.customerCreateModel.set({
      active: true,
      address: "",
      notes: "",
      userId: this.userId()
    });
  }

  ngOnChanges(): void {
    this.customerCreateModel.set({
      active: true,
      address: "",
      notes: "",
      userId: this.userId()
    });
  }

  submitCustomerCreateForm($event: Event) {
    $event.preventDefault();
    console.log(this.customerCreateModel());
    this.onCreateCustomer.emit(this.customerCreateModel())
  }

  backToList() {
    this.onBackToList.emit();
  }
}
