import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  constructor(private backend: BackendService, private alertService: AlertService) {}

  async ngOnInit() {
    try {
      const response = await this.backend.getSum({ group: 'category', endAmount: 0 });
    } catch (err) {
      this.alertService.error(err.message);
    }
  }
}
