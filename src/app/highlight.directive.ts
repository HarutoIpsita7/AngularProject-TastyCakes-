import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  // Directives give common functionality to the html elements
  // So we need the element ot implement the functionality
  constructor(private elem:ElementRef) { 
    // console.log("Element we got: ", this.elem.nativeElement);  // We can get the element

    // We can add any common functionality
    this.elem.nativeElement.style.color = "turquoise";  
  }

}
