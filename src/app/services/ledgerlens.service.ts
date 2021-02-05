import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerlensService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  async getUser(token: string): Promise<any> {
    const conf = await this.configService.get();
    const headers = { authorization: token };
    return await this.http.get(conf.ledgerlens.user, { headers }).toPromise();
  }
}
