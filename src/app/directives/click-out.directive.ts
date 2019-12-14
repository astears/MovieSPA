import { Directive, HostListener, ElementRef, Output, EventEmitter, ViewChild, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[clickOut]'
})
export class ClickOutDirective {
  @Output() clickOut = new EventEmitter();
  @Input() allowedClick: ElementRef;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.elementRef.nativeElement.contains(event.target) && (this.allowedClick !== event.target)) {
      this.clickOut.emit(null);
    }
  }
}
