import { Component, Input, OnInit } from '@angular/core';

import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  @Input() public title = '';

  constructor(private random: RandomService) {}

  ngOnInit(): void {}

  public assignColors(): void {}
}
