import { RequestOptionsArgs } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';

enum Key {
  Backspace = 8,
  Tab = 9,
  Enter = 13,
  Shift = 16,
  Escape = 27,
  ArrowLeft = 37,
  ArrowRight = 39,
  ArrowUp = 38,
  ArrowDown = 40
}
/*
 using an external template:
 <input [typeaheadTpl]="itemTpl" >

  <ng-template #itemTpl let-result>
    <strong>MY {{ result.result }}</strong>
  </ng-template>
*/
@Component({
  selector: '[typeahead]',
  template: `
  <ng-template #suggestionsTplRef>
  <section class="list-group results" *ngIf="showSuggestions">
    <div class="typeahead-backdrop" (click)="hideSuggestions()"></div>
    <button type="button" class="list-group-item"
      *ngFor="let result of results; let i = index;"
      [class.active]="markIsActive(i, result)"
      (click)="handleSelectSuggestion(result)">
      <span *ngIf="!typeaheadItemTpl"><i class="fa fa-search"></i> {{ result }}</span>
      <ng-template
        [ngTemplateOutlet]="typeaheadItemTpl" 
        [ngOutletContext]="{ $implicit: {result: result, index: i} }"
      ></ng-template>
    </button>
  </section>
  </ng-template>
  `,
  styles: [`
  .typeahead-backdrop {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
  `]
})
export class TypeAheadComponent implements OnInit, OnDestroy {
  @Output() typeaheadSelected = new EventEmitter<string>();
  @Input() typeaheadItemTpl: TemplateRef<any>;

  showSuggestions = false;
  results: string[];
  private suggestionIndex = 0;
  private subscriptions: Subscription[];
  private activeResult: string;

  @ViewChild('suggestionsTplRef') suggestionsTplRef;

  @HostListener('keydown', ['$event'])
  handleEsc(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideSuggestions();
      event.preventDefault();
    }
  }

  constructor(private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private jsonp: Jsonp,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const onkeyDown$ = this.onElementKeyDown();
    this.subscriptions = [
      this.filterEnterEvent(onkeyDown$),
      this.listenAndSuggest(),
      this.navigateWithArrows(onkeyDown$)
    ];
    this.renderTemplate();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.length = 0;
  }

  renderTemplate() {
    this.viewContainer.createEmbeddedView(this.suggestionsTplRef);
    this.cdr.markForCheck();
  }

  onElementKeyDown() {
    return Observable.fromEvent(this.element.nativeElement, 'keydown').share();
  }

  filterEnterEvent(elementObs: Observable<{}>) {
    return elementObs
      .filter((e: KeyboardEvent) => e.keyCode === Key.Enter)
      .subscribe((event: Event) => {
        event.preventDefault();
        this.handleSelectSuggestion(this.activeResult);
      });
  }

  listenAndSuggest() {
    return Observable.fromEvent(this.element.nativeElement, 'keyup')
      .filter(this.validateKeyCode)
      .map((e: any) => e.target.value)
      .debounceTime(300)
      .concat()
      .distinctUntilChanged()
      .filter((query: string) => query.length > 0)
      .switchMap((query: string) => this.suggest(query))
      .subscribe((results: string[]) => {
        this.results = results;
        this.showSuggestions = true;
        this.suggestionIndex = 0;
        this.cdr.markForCheck();
    });
  }

  navigateWithArrows(elementObs: Observable<{}>) {
    return elementObs
      .filter((e: any) => e.keyCode === Key.ArrowDown || e.keyCode === Key.ArrowUp)
      .map((e: any) => e.keyCode)
      .subscribe((keyCode: number) => {
        const step = keyCode === Key.ArrowDown ? 1 : -1;
        const topLimit = 9;
        const bottomLimit = 0;
        this.suggestionIndex += step;
        if (this.suggestionIndex === topLimit + 1) {
          this.suggestionIndex = bottomLimit;
        }
        if (this.suggestionIndex === bottomLimit - 1) {
          this.suggestionIndex = topLimit;
        }
        this.showSuggestions = true;
        this.cdr.markForCheck();
      });
  }
  suggest(query: string) {
    const url = 'http://suggestqueries.google.com/complete/search';
    const searchConfig: URLSearchParams = new URLSearchParams();
    const searchParams = {
      hl: 'en',
      ds: 'yt',
      xhr: 't',
      client: 'youtube',
      q: query,
      callback: 'JSONP_CALLBACK'
    };
    Object.keys(searchParams).forEach(param => searchConfig.set(param, searchParams[param]));
    const options: RequestOptionsArgs = {
      search: searchConfig
    };
    return this.jsonp.get(url, options)
      .map(response => response.json()[1])
      .map(results => results.map(result => result[0]));
  }

  markIsActive(index: number, result: string) {
    const isActive = index === this.suggestionIndex;
    if (isActive) {
      this.activeResult = result;
    }
    return isActive;
  }
  handleSelectSuggestion(suggestion: string) {
    this.hideSuggestions();
    this.typeaheadSelected.emit(suggestion);
  }

  validateKeyCode(event: KeyboardEvent) {
    return event.keyCode !== Key.Tab
     && event.keyCode !== Key.Shift
     && event.keyCode !== Key.ArrowLeft
     && event.keyCode !== Key.ArrowUp
     && event.keyCode !== Key.ArrowRight
     && event.keyCode !== Key.ArrowDown;
  }

  hideSuggestions() {
    this.showSuggestions = false;
  }

  hasItemTemplate() {
    return this.typeaheadItemTpl !== undefined;
  }
}
