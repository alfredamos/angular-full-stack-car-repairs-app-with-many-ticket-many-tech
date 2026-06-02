import {Component, input, OnChanges, OnInit, output, signal, SimpleChanges} from '@angular/core';
import {form, FormField, required} from "@angular/forms/signals";
import {CustomerResponse} from "../../../models/customerResp.model";
import {CustomerInputEdit} from "../../../models/customerInputEdit.model";

@Component({
  selector: 'app-edit-customer',
  imports: [
    FormField
  ],
  templateUrl: './edit-customer.html',
  styleUrl: './edit-customer.css',
})
export class EditCustomer implements OnInit, OnChanges{
  customer = input.required<CustomerInputEdit>();

  onEditCustomer = output<CustomerInputEdit>();
  onBackToList = output<void>();


  customerInputEditModel = signal<CustomerInputEdit>({
    address: "",
    notes: "",
  });

  ngOnInit() {
   this.loadCustomer()
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.loadCustomer()
  }


  customerEditForm = form(this.customerInputEditModel, (schemaPath)=> {
    required(schemaPath.address, {message: "Address is required"});
    required(schemaPath.notes, {message: "Notes is required"});
  });

  submitCustomerEditForm($event: Event) {
    $event.preventDefault();
    this.onEditCustomer.emit(this.customerInputEditModel())
  }

  backToList() {
    this.onBackToList.emit();
  }

  loadCustomer(){
    this.customer();
    this.customerInputEditModel.set(this.customer());
  }


}
