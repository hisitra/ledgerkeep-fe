import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServiceConfig {
  ledgerguard: {
    googleAuthEndpoint: string;
    facebookAuthEndpoint: string;
  };
  ledgerlens: {
    user: string;
    transactionSum: string;
    transactionCount: string;
    categoryCount: string;
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

  public async get(): Promise<ServiceConfig> {
    if (!this.isLoaded) {
      this.configs = await this.http.get<ServiceConfig>(this.CONFIG_URL).toPromise();
      this.isLoaded = true;
    }
    if (this.configs === undefined) {
      throw new Error('Failed to load the configs.');
    }
    return this.configs;
  }
}
