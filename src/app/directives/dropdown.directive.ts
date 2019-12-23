import {  Directive,
          HostListener,
          ElementRef,
          Renderer2 }
from "../../../node_modules/@angular/core";

@Directive({
  selector: '[app-dropdown]'
})
export class DropdownDirective {
  manageDropdown : boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event']) openDropdown() {
    if(!this.manageDropdown) {
      this.renderer.addClass(this.elementRef.nativeElement,'open');
      this.manageDropdown = !this.manageDropdown;
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.manageDropdown = !this.manageDropdown;
    }
  }
}
