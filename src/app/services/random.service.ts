import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  constructor() {}

  integer(end: number) {
    return Math.floor(Math.random() * end);
  }

  color() {
    return { r: this.integer(255), g: this.integer(255), b: this.integer(255) };
  }
}
