import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ElqService {
  constructor(private route: ActivatedRoute) {}

  public async getQuery(): Promise<{ [key: string]: any }> {
    const params = await this.getFromRoute();

    const query: { [key: string]: any } = {};
    if (params.startTime && !isNaN(parseInt(params.startTime, 10))) {
      query.startTime = parseInt(params.startTime, 10);
    }
    if (params.endTime && !isNaN(parseInt(params.endTime, 10))) {
      query.endTime = parseInt(params.endTime, 10);
    }
    if (params.category) {
      query.category = params.category;
    }
    query.interval = params.interval || 'day';

    return query;
  }

  private async getFromRoute(): Promise<{ [key: string]: string }> {
    return new Promise((resolve, reject) => {
      this.route.queryParams.subscribe(resolve);
    });
  }
}
