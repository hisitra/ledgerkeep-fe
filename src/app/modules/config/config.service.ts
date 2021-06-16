import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IConfig } from './config.interface';

@Injectable()
export class ConfigService {
  private readonly CONFIG_URL = 'assets/conf.json';
  private isLoaded = false;
  private configs?: IConfig;

  constructor(private readonly http: HttpClient) {}

  public async get(): Promise<IConfig> {
    if (!this.isLoaded) {
      this.configs = await this.http.get<IConfig>(this.CONFIG_URL).toPromise();
      this.isLoaded = true;
    }
    if (this.configs === undefined) {
      throw new Error('Failed to load the configs.');
    }
    return this.configs;
  }
}
