import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'player-search',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./player-search.scss'],
  template: `
    <form class="navbar-form form-search" id="media-explorer"
      [formGroup]="searchForm"
      >
      <div class="form-group clearfix is-flex-row">
        <input placeholder="Find My Echoes..." id="media-search"
          #mediaSearch
          ngxTypeahead
          [taUrl]="'//suggestqueries.google.com/complete/search'"
          [taParams]="params"
          [taAllowEmpty]="true"
          (taSelected)="handleSelectSuggestion($event)"
          type="search" class="form-control" autocomplete="off"
          name="mediaSearch"
          formControlName="searchInput"
          >
        <button class="btn btn-transparent btn-submit" tooltip="search with echoes">
          <icon name="search"></icon>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSearchComponent implements OnChanges, OnDestroy {
  @Input() query;
  @Output() queryChange = new EventEmitter<string>();
  @Output() search = new EventEmitter();
  // @Output() typing = new EventEmitter<string>();

  @ViewChild('mediaSearch') mediaSearch;

  searchForm: FormGroup;
  formState: Subscription;

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
    this.formState = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        filter(value => !value.hasOwnProperty('isTrusted'))
      )
      .subscribe(formState => {
        this.onQueryChange(formState.searchInput);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedQuery = changes && changes.query;
    if (
      changedQuery &&
      changedQuery.currentValue &&
      changedQuery.currentValue.hasOwnProperty('length')
    ) {
      this.patchSearchInput(changedQuery.currentValue);
    }
  }

  ngOnDestroy() {
    this.formState.unsubscribe();
  }

  patchSearchInput(searchInput: string) {
    this.searchForm.patchValue({ searchInput }, { emitEvent: false });
  }

  onQueryChange(query: string) {
    this.queryChange.emit(query);
  }

  onSearch() {
    const searchFormState = this.searchForm.value;
    this.selectSuggestion(searchFormState.searchInput);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    if (!suggestion.hasOwnProperty('isTrusted')) this.search.emit(suggestion);
  }
}
