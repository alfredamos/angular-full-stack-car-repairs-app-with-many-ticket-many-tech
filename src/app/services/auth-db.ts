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

@Injectable({
  providedIn: 'root',
})
export class AuthDb {
  apiClient = inject(ApiHttpClientService) as ApiHttpClientService<ChangeUserPassword | ChangeUserRole | LoginUser | SignupUser | EditUserProfile | null>;
  authService = inject(AuthService);

  async changeUserPassword(payload: ChangeUserPassword) {
    return await this.apiClient.patch<ResponseMessage>('/auth/change-password', payload);
  }

  async changeUserRole(payload: ChangeUserRole) {
    return await this.apiClient.patch<ResponseMessage>('/auth/change-role', payload);
  }

  async editUserProfile(payload: EditUserProfile) {
    return await this.apiClient.patch<ResponseMessage>('/auth/edit-profile', payload);
  }

  async getCurrentUser(){
    return await this.apiClient.get<UserDto>('/auth/me')
  }

  async loginUser(payload: LoginUser) {
    console.log("At point 1-1, In auth-db, loginUser : ", payload);

    const response = await this.apiClient.post<UserSession>('/auth/login', payload);
    console.log("At point 1-2, In auth-db, response : ", response);
    this.authService.setSession(response);

    console.log("At point 1-3, In auth-db, response : ", response);

    return response;
  }

  async logoutUser() {
    const response = await this.apiClient.post<UserSession>('/auth/logout', null);
    this.authService.setSession(response);

    return response;
  }

  async refreshUserToken() {
    return await this.apiClient.post<UserSession>('/auth/refresh', null);
  }

  async signupUser(payload: SignupUser) {
    return await this.apiClient.post<ResponseMessage>('/auth/signup', payload);
  }
}
