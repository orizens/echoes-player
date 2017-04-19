import { InfiniteScrollEvent } from './models';
import {
  Directive, ElementRef, Input, Output,
  EventEmitter, OnDestroy, OnInit,
  SimpleChanges, NgZone
} from '@angular/core';
import { PositionResolverFactory } from './position-resolver';
import { ScrollRegister, ScrollRegisterConfig } from './scroll-register';
import { ScrollResolver } from './scroll-resolver';
import { Subscription } from 'rxjs/Subscription';


@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit {
  @Output() scrolled = new EventEmitter<InfiniteScrollEvent>();
  @Output() scrolledUp = new EventEmitter<InfiniteScrollEvent>();

  @Input('infiniteScrollDistance') _distanceDown: number = 2;
  @Input('infiniteScrollUpDistance') _distanceUp: number = 1.5;
  @Input('infiniteScrollThrottle') _throttle: number = 300;
  @Input('infiniteScrollDisabled') _disabled: boolean = false;
  @Input('scrollWindow') scrollWindow: boolean = true;
  @Input('immediateCheck') _immediate: boolean = false;
  @Input('horizontal') _horizontal: boolean = false;
  @Input('alwaysCallback') _alwaysCallback: boolean = false;
  @Input()
  set debounce(value: string | boolean) {
    this.throttleType = value === '' || !!value ? 'debounce' : 'throttle';
  }

  private throttleType: string = 'throttle';
  private disposeScroller: Subscription;

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private positionResolverFactory: PositionResolverFactory,
    private scrollRegister: ScrollRegister,
    private scrollerResolver: ScrollResolver
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const containerElement = this.scrollWindow ? window : this.element;
      const positionResolver = this.positionResolverFactory.create({
        windowElement: containerElement,
        horizontal: this._horizontal
      });
      const scrollResolverConfig = {
        distance: {
          down: this._distanceDown,
          up: this._distanceUp
        }
      };
      const options: ScrollRegisterConfig = {
        container: positionResolver.container,
        throttleType: this.throttleType,
        throttleDuration: this._throttle,
        filterBefore: () => !this._disabled,
        mergeMap: () => positionResolver.calculatePoints(this.element),
        scrollHandler: (container) => {
          const scrollStats = this.scrollerResolver.getScrollStats(container, scrollResolverConfig);
          if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
            const infiniteScrollEvent: InfiniteScrollEvent = {
              currentScrollPosition: container.scrolledUntilNow
            };
            if (scrollStats.isScrollingDown) {
              this.onScrollDown(infiniteScrollEvent);
            } else {
              this.onScrollUp(infiniteScrollEvent);
            }
          }
        }
      };
      this.disposeScroller = this.scrollRegister.attachEvent(options);
    }
  }

  shouldTriggerEvents(shouldScroll: boolean) {
    return (this._alwaysCallback || shouldScroll) && !this._disabled;
  }

  ngOnDestroy () {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }

  onScrollDown(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolled.emit(data));
  }

  onScrollUp(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolledUp.emit(data));
  }
}
