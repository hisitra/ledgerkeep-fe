import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRaiseOnLoad]',
})
export class RaiseOnLoadDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    const htmlElement = this.element.nativeElement as HTMLElement;

    // Z-Index -1 keeps the element below toolbar.
    htmlElement.style.zIndex = '-1';

    setTimeout(() => htmlElement.classList.add('mat-elevation-z4'), 10);
  }
}
