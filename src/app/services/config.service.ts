import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServiceConfig {
  ledgerguard: {
    googleAuthEndpoint: string;
    facebookAuthEndpoint: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONFIG_URL = 'assets/conf.json';
  private configs: ServiceConfig | undefined;
  private isLoaded = false;

  constructor(private http: HttpClient) {}

  public async get(): Promise<ServiceConfig | undefined> {
    if (!this.isLoaded) {
      this.configs = await this.http.get<ServiceConfig>(this.CONFIG_URL).toPromise();
      this.isLoaded = true;
    }
    return this.configs;
  }
}
