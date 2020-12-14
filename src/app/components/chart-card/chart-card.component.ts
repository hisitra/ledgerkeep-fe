import { Component, OnInit, Input } from '@angular/core';

declare var google;

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent implements OnInit {
  @Input() public titleIcon = '';
  @Input() public title = '';
  @Input() public subtitle = '';

  constructor() {}

  ngOnInit(): void {}

  public async addPieChart(rows: any, options: any): Promise<void> {
    google.charts.load('current', { packages: ['corechart'] });

    return new Promise((resolve) => {
      google.charts.setOnLoadCallback(() => {
        const tableData = new google.visualization.DataTable();
        tableData.addColumn('string', '_');
        tableData.addColumn('number', '_');
        tableData.addRows(rows);

        const chart = new google.visualization.PieChart(document.getElementById('chart-holder'));
        chart.draw(tableData, options);
        resolve();
      });
    });
  }
}
