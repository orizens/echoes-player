import { Jsonp, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'player-search',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './player-search.scss' ],
  // <input placeholder="Explore Media" id="media-search"
  //         typeahead (typeaheadSelected)="handleSelectSuggestion($event)"
  //         type="search" class="form-control" autocomplete="off"
  //         [value]="query.query" #mediaSearch name="mediaSearch"
  //         (input)="onQueryChange(mediaSearch.value)"
  //         >
  template: `
    <form class="navbar-form form-search" id="media-explorer"
      #form="ngForm"
      (ngSubmit)="onSearch(mediaSearch.value)">
      <div class="form-group clearfix">
        <input placeholder="Explore Media" id="media-search"
          ngxTypeahead
          [taUrl]="'http://suggestqueries.google.com/complete/search'"
          [taParams]="params"
          (taSelected)="handleSelectSuggestion($event)"
          type="search" class="form-control" autocomplete="off"
          [value]="query.query" #mediaSearch name="mediaSearch"
          (input)="onQueryChange(mediaSearch.value)"
          >
        <button class="btn btn-transparent btn-submit" type="submit" title="search with echoes">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSearch {
  @Input() query;
  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() typing = new EventEmitter<string>();

  @ViewChild('mediaSearch') mediaSearch;

  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };

  constructor() { }

  onQueryChange(query: string) {
    this.change.emit(query);
  }

  onSearch(query: string) {
    const _query = query || this.mediaSearch.element.nativeElement.value;
    this.mediaSearch.element.nativeElement.blur();
    this.search.emit(_query);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    this.onSearch(suggestion);
  }
}
