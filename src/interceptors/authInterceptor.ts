import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from "@angular/common/http";
import { inject } from "@angular/core";
import {AuthService} from "../app/services/auth-service";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  //----> Get the auth from local storage.
  const authService = inject(AuthService);

  //----> Get the access-token.
  const accessToken = authService.accessToken();
  console.log("In authInterceptor, accessToken : ", accessToken);

  //----> Clone the request to add credentials (cookies/sessions) and headers
  const clonedRequest = req.clone({
    withCredentials: true, // Enables sending cookies
    setHeaders: {
      Authorization: `Bearer ${accessToken}`, // Example token
    },
  });

  return next(clonedRequest);
};
