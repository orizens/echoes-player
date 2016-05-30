// import {isPresent} from 'angular2/src/facade/lang';
import {Directive, ElementRef, Input, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
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
export class InfiniteScroll implements OnDestroy, OnInit {
  private _distance: number = 2;
  @Input() set infiniteScrollDistance(distance: number) {
    this._distance = distance;
  }
  @Output() scrolled = new EventEmitter();
  private scroller: Scroller;

  constructor( private element: ElementRef ) {}

  ngOnInit () {
    this.scroller = new Scroller(window, setInterval, this.element, this.onScroll.bind(this), this._distance, {});
  }

  ngOnDestroy () {
    console.log('destroy SCROLLER');
    this.scroller.clean();
  }

  onScroll () {
    this.scrolled.next({});
  }
}
