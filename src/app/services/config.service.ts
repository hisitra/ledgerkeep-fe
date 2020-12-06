import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServiceConfig {
  auth: { tokenKey: string };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONFIG_URL = 'assets/config/app-config.json';
  private configs: ServiceConfig;

  constructor(private http: HttpClient) {}

  public async loadConfigs(): Promise<void> {
    this.configs = await this.http.get<ServiceConfig>(this.CONFIG_URL).toPromise();
  }

  public get(): ServiceConfig {
    return this.configs;
  }
}
