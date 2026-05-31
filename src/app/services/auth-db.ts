import {inject, Injectable} from '@angular/core';
import {ApiHttpClientService} from "./api-client-service";
import {
  ChangeUserPassword,
  ChangeUserRole,
  EditUserProfile,
  LoginUser,
  SignupUser
} from "../../server/validations/auth.validation";
import {ResponseMessage} from "../../server/utils/responseMessage";
import {UserSession} from "../../models/UserSession.model";
import {UserDto} from "../../models/userDto.model";
import {AuthService} from "./auth-service";
import {UserService} from "./user-service";

@Injectable({
  providedIn: 'root',
})
export class AuthDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<ChangeUserPassword | ChangeUserRole | LoginUser | SignupUser | EditUserProfile | null>;
  authService = inject(AuthService);
  userService = inject(UserService);

  async changeUserPassword(payload: ChangeUserPassword) {
    return await this.apiClient.patch<ResponseMessage>('/auth/change-password', payload);
  }

  async changeUserRole(payload: ChangeUserRole) {
    try {
      const response = await this.apiClient.patch<UserDto>('/auth/change-role', payload);

      this.userService.updateUser(response);

      return response;
    }catch (err){
      console.log("Error-message in changeUserRole, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }

  async editUserProfile(payload: EditUserProfile) {
    try {
      return await this.apiClient.patch<ResponseMessage>('/auth/edit-profile', payload);
    }catch (err){
      console.log(" error-message in edit-user-profile, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }

  async loginUser(payload: LoginUser) {
    try {
      const response = await this.apiClient.post<UserSession>('/auth/login', payload);
      this.authService.setSession(response);

      return response;
    }catch (err){
      console.log(" error-message in login-user, error : ", err);
      throw new Error("Invalid credentials. Please try again.")
    }

  }

  async logoutUser() {
    try {
      const response = await this.apiClient.post<UserSession>('/auth/logout', null);
      this.authService.setSession(response);

      return response;
    }catch (err){
      console.log(" error-message in logout-user, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }

  async refreshUserToken() {
    try {
      return await this.apiClient.post<UserSession>('/auth/refresh', null);
    }catch (err){
      console.log(" error-message in refresh-user-token, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }

  async signupUser(payload: SignupUser) {
    try {
      return await this.apiClient.post<ResponseMessage>('/auth/signup', payload);
    }catch (err){
      console.log(" error-message in signup-user, error : ", err);
      throw new Error("Something went wrong. Please try again later.")
    }

  }
}
