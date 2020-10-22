import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

import { imageKeep } from '../../../assets/configs.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public imagePath = `${imageKeep.address}${imageKeep.randomCover}?width=800`;

  public user: any = {};
  public isLoading = false;

  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    this.isLoading = true;

    try {
      this.user = (await this.backend.getUser()).data;
    } catch (err) {
      this.alertService.error(err.message);
    }

    this.isLoading = false;
  }

  async onGeneralUpdate(firstName: string, lastName: string): Promise<void> {
    if (this.user.firstName === firstName && this.user.lastName === lastName) {
      this.alertService.warn('No updates provided.');
      return;
    }
  }

  async onPasswordUpdate(currentPassword: string, newPassword: string): Promise<void> {}
}
