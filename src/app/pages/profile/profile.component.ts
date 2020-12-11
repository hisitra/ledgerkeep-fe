import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public isLoading = false;
  public imageSource: string;
  public user = {};

  constructor(private conf: ConfigService) {
    const configs = this.conf.get();
    this.imageSource = `${configs.api.imagekeep}/api/generalAccess/cover/random.jpg?width=800`;
  }

  ngOnInit(): void {}
}
