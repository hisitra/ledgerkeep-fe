import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root',
})
export class SecondaryDrawerService {
  private emitter = new EventEmitter();

  constructor() {}

  public close(): void {
    this.emitter.emit('close');
  }

  public toggle(): void {
    this.emitter.emit('toggle');
  }

  public onClose(action: () => void): void {
    this.emitter.on('close', action);
  }

  public onToggle(action: () => void): void {
    this.emitter.on('toggle', action);
  }
}
