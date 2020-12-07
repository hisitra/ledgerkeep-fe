import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRaiseOnLoad]',
})
export class RaiseOnLoadDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    const htmlElement = this.element.nativeElement as HTMLElement;
    setTimeout(() => htmlElement.classList.add('mat-elevation-z3'), 10);
  }
}
