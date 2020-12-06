import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServiceConfig {}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly CONFIG_URL = 'assets/config/app-config.json';
  private configs: ServiceConfig;

  constructor(private http: HttpClient) {}

  public async loadConfigs(): Promise<void> {
    console.info('Loading application configs...');
  }
}
