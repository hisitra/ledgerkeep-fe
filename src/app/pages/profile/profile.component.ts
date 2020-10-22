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
    const updates: any = {};
    if (firstName && this.user.firstName !== firstName) {
      updates.firstName = firstName;
    }
    if (lastName && this.user.lastName !== lastName) {
      updates.lastName = lastName;
    }

    if (Object.keys(updates).length === 0) {
      this.alertService.warn('No updates were provided.');
      return;
    }

    try {
      await this.backend.updateUser(updates);

      this.user.firstName = firstName || this.user.firstName;
      this.user.lastName = lastName || this.user.lastName;

      this.alertService.success('Profle updated.');
    } catch (err) {
      this.alertService.error(err.message);
    }
  }

  async onPasswordUpdate(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.backend.updateUserPassword(currentPassword, newPassword);
      this.alertService.success('Password updated.');
    } catch (err) {
      this.alertService.error(err.message);
    }
  }
}
