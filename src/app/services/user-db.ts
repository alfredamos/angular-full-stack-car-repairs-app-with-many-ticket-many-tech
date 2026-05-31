import { Injectable, inject } from '@angular/core';
import {ApiHttpClientService} from "./api-client-service";
import {UserDto} from "../../models/userDto.model";
import {UserService} from "./user-service";

@Injectable({
  providedIn: 'root',
})
export class UserDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<null>;

  userService = inject(UserService);

  async deleteUserById(id: string) {
    try {
      this.userService.deleteUser(id)
      return await this.apiClient.delete<UserDto>(`/users/${id}`);
    }catch (err){
      console.log(" error-message in delete-user-by-id, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }
}
