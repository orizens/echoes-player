import { Component, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { isNewChange } from '@shared/utils/data.utils';
@Directive({
  selector: '[btn]'
})
export class ButtonDirective implements OnInit, OnChanges {

  @Input() btn = '';

  private mainStyle = 'btn';
  private stylePrefix = 'btn-';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.addClass(this.mainStyle);
  }

  ngOnChanges({ btn }: SimpleChanges) {
    if (btn && isNewChange(btn)) {
      this.applyStyles();
    }
  }

  addClass(className: string) {
    this.renderer.addClass(this.element.nativeElement, className);
  }

  applyStyles() {
    const prefix = this.stylePrefix;
    const styles = this.btn.split(' ').map(style => `${prefix}${style}`)
      .forEach(className => this.addClass(className));
  }
}
