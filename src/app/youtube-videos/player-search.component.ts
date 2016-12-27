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
  ViewChild
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Rx';

import './player-search.less';

@Component({
  selector: 'player-search',
  template: `
    <form class="navbar-form form-search" id="media-explorer"
      (ngSubmit)="onSearch(mediaSearch.value)">
      <div class="form-group clearfix">
        <input placeholder="Explore Media" id="media-search"
          typeahead (typeaheadSelected)="handleSelectSuggestion($event)"
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

  private searchQuery = {
    query: ''
  };

  @ViewChild('mediaSearch') mediaSearch;

  constructor() { }

  onQueryChange(query: string) {
    this.change.emit(query);
  }

  onSearch(query: string) {
    this.mediaSearch.element.nativeElement.blur();
    this.search.emit(query);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    this.onSearch(suggestion);
  }
}
