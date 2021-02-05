import { Component, OnInit } from '@angular/core';
import { ConfigService, ServiceConfig } from '../../services/config.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {}

  public async googleLogin(): Promise<void> {
    const conf = await this.configService.get();
    const endpoint = conf.ledgerguard.googleAuthEndpoint;
    if (endpoint) {
      window.location.href = endpoint;
    }
  }

  public async facebookLogin(): Promise<void> {
    const conf = await this.configService.get();
    const endpoint = conf.ledgerguard.facebookAuthEndpoint;
    if (endpoint) {
      window.location.href = endpoint;
    }
  }
}
