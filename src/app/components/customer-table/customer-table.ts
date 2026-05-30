import {Component, input, output} from '@angular/core';
import {CustomerResponse} from "../../../models/customerResp.model";
import {formattedDate} from "../../utils/formattedDate";
import {stringToDate} from "../../utils/stringDate";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-customer-table',
  imports: [
    RouterLink,
    NgOptimizedImage
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

  protected readonly formattedDate = formattedDate;
  protected readonly stringToDate = stringToDate;
}
