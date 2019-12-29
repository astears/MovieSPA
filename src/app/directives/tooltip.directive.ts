import { Directive, ElementRef } from '@angular/core';

declare var $ :any;

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(private el: ElementRef) {
    $(el.nativeElement).tooltip();
  }

}
