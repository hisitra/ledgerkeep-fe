import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root',
})
export class PieChartService {
  constructor() {
    google.charts.load('current', { packages: ['corechart'] });
  }

  public draw(
    host: HTMLElement,
    keyName: string,
    valueName: string,
    data: { key: string; value: number }[],
    options: any = {},
  ): void {
    const table = new google.visualization.DataTable();

    table.addColumn('string', keyName);
    table.addColumn('number', valueName);

    const rows = data.map((entry) => {
      return [entry.key, entry.value];
    });

    table.addRows(rows);

    const chart = new google.visualization.PieChart(host);
    chart.draw(table, options);
  }
}
