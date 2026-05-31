import {Component, input, output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CustomerResponse} from "../../../models/customerResp.model";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-customer-table',
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css',
})
export class CustomerTable {
  customers = input.required<CustomerResponse[]>()

  onChangeStatus = output<string>()

  async changeCustomerStatus(id: string) {
    this.onChangeStatus.emit(id);
  }

}
