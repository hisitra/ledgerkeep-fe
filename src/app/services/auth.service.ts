import { Injectable } from "@angular/core";

import configs from "../../assets/configs.json";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  isSoftLoggedIn(): boolean {
    return this.getEmail() && this.getToken() && true;
  }

  getEmail(): string {
    return localStorage.getItem(configs.auth.emailKey);
  }

  getToken(): string {
    return localStorage.getItem(configs.auth.tokenKey);
  }
}
