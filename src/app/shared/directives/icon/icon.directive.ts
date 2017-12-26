import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Renderer2
} from '@angular/core';
import { isNewChange } from '@utils/data.utils';

const ICON_BASE_CLASSNAME = 'fa';
const ICON_LIB_PREFFIX = 'fa';
@Directive({
  selector: 'icon, [appIcon]'
})
export class IconDirective implements OnInit, OnChanges {
  @Input() name = '';

  icons = {
    'fa': true
  };

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const { name } = this;
    let classes = [ICON_BASE_CLASSNAME];
    if (name) {
      classes = [...classes, ...this.createIconStyles(name)];
    }
    this.setClasses(classes);
  }

  ngOnChanges({ name }: SimpleChanges) {
    if (name && isNewChange(name)) {
      this.createIconStyles(name.currentValue);
    }
  }

  createIconStyles(names: string): string[] {
    return names.split(' ')
      .map(name => `${ICON_LIB_PREFFIX}-${name}`);
  }

  setClasses(names: string[]) {
    names.forEach(name =>
      this.renderer.addClass(this.el.nativeElement, name));
  }
}
