import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServiceConfig {}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONFIG_URL = 'assets/conf.json';
  private configs: ServiceConfig = {};
  private isLoaded = false;

  constructor(private http: HttpClient) {}

  public async get(): Promise<ServiceConfig> {
    if (!this.isLoaded) {
      this.configs = await this.http.get<ServiceConfig>(this.CONFIG_URL).toPromise();
      this.isLoaded = true;
    }
    return this.configs;
  }
}
