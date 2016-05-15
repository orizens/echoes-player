// import {isPresent} from 'angular2/src/facade/lang';
import {Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
import { Scroller } from './scroller';

/**
 * Infinite Scroll for Angular 2
 *
 * ## Use
 *
 * ```
 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
 * ```
 */
@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll {
  @Input() infiniteScrollDistance: Number;
  @Output() scrolled = new EventEmitter();
  private scroller: Scroller;

  constructor( private element: ElementRef ) {
    this.scroller = new Scroller(window, setInterval, element, this.onScroll.bind(this), 2, {});
  };

  onScroll () {
    this.scrolled.next({});
  }
}
