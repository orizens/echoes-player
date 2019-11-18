import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input() tooltip = '';

  // private resolver: ComponentFactoryResolver,
  // private viewContainerRef: ViewContainerRef,
  constructor(private el: ElementRef) {}
  // constructor(private el: ElementRef, private renderer: Renderer2) {}
}
