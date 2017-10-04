import { Jsonp, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'player-search',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './player-search.scss' ],
  template: `
    <form class="navbar-form form-search" id="media-explorer"
      [formGroup]="searchForm"
      (ngSubmit)="onSearch()">
      <div class="form-group clearfix">
        <input placeholder="Find My Echoes..." id="media-search"
          #mediaSearch
          ngxTypeahead
          [taUrl]="'http://suggestqueries.google.com/complete/search'"
          [taParams]="params"
          (taSelected)="handleSelectSuggestion($event)"
          type="search" class="form-control" autocomplete="off"
          name="mediaSearch"
          formControlName="searchInput"
          >
        <button class="btn btn-transparent btn-submit" type="submit" tooltip="search with echoes">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// (input)="onQueryChange()"
export class PlayerSearchComponent implements OnChanges {
  @Input() query;
  @Output() queryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter();
  // @Output() typing = new EventEmitter<string>();

  @ViewChild('mediaSearch') mediaSearch;

  searchForm: FormGroup;

  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      searchInput: this.query
    });
    this.searchForm.valueChanges
      .debounceTime(400)
      .filter(value => !value.hasOwnProperty('isTrusted'))
      .subscribe(formState => {
        this.onQueryChange(formState.searchInput);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedQuery = changes && changes.query;
    if (changedQuery) {
      this.patchSearchInput(changedQuery.currentValue);
    }
  }

  patchSearchInput(searchInput: string) {
    this.searchForm.patchValue({ searchInput }, { emitEvent: false });
  }

  onQueryChange(query: string) {
    this.queryChange.emit(query);
  }

  onSearch() {
    const searchFormState = this.searchForm.value;
    this.search.emit(searchFormState.searchInput);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    this.search.emit(suggestion);
  }
}
