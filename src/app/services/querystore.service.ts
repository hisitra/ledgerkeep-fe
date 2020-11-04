import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuerystoreService {
  private myTxKey = 'LK_MY_TX_QUERY';

  constructor() {}

  public setMyTxQuery(query: { [key: string]: any }): void {
    localStorage.setItem(this.myTxKey, JSON.stringify(query));
  }

  public getMyTxQuery(): { [key: string]: any } {
    try {
      return JSON.parse(localStorage.getItem(this.myTxKey));
    } catch (err) {
      console.warn('Error while parsing My Transactions query from Local Storage.', err);

      this.setMyTxQuery({});
      return {};
    }
  }
}
