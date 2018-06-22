import { Directive, Output, HostListener, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter();

  constructor(private _elementref: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement){
      const isClickedInside = this._elementref.nativeElement.contains(targetElement);
      if(!isClickedInside){
        this.clickOutside.emit(null);
      }
    }
}
