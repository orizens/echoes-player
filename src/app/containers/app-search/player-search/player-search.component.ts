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
import { IQueryParams } from '@core/store/player-search';

const defaultSearchParams = {
  hd: false,
  duration: false
};

@Component({
  selector: 'player-search',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./player-search.scss'],
  template: `
    <form class="navbar-form form-search is-flex-row"
      [formGroup]="searchForm"
      >
      <input placeholder="Find My Echoes..."
        ngxTypeahead
        [taUrl]="'//suggestqueries.google.com/complete/search'"
        [taParams]="params"
        [taAllowEmpty]="true"
        (taSelected)="handleSelectSuggestion($event)"
        type="search" class="form-control" autocomplete="off"
        formControlName="query"
        >
      <button class="btn btn-transparent btn-submit is-flex-row is-flex-valign" title="search with echoes">
        <icon name="search"></icon>
      </button>
    </form>
      <button class="btn btn-filter btn-transparent is-flex-row is-flex-valign">
        <icon name="filter" [ngClass]="{'text-primary': filtersForm.value.duration || filtersForm.value.hd }"></icon>
        <form class="filters is-rounded" [formGroup]="filtersForm">
          <div class="filter">
            <input id="long" type="checkbox" class="form-control" formControlName="duration">
            <label for="long" class="filter-label">long</label>
          </div>
          <div class="filter">
            <input id="hd" type="checkbox" class="form-control" formControlName="hd">
            <label for="hd" class="filter-label">HD</label>
          </div>
          <icon name="trash" *ngIf="filtersForm.value.duration || filtersForm.value.hd" (click)="clearFilters()"></icon>
        </form>
      </button>
      `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSearchComponent implements OnChanges, OnDestroy {
  @Input() query;
  @Input() searchParams = { ...defaultSearchParams };
  @Output() queryChange = new EventEmitter<string>();
  @Output() paramsChange = new EventEmitter<ISearchFormParams>();
  @Output() search = new EventEmitter();

  searchForm: FormGroup;
  filtersForm: FormGroup;
  formState: Subscription;
  filtersChanged: Subscription;

  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      query: this.query
    });
    this.filtersForm = fb.group({
      ...this.searchParams
    });

    this.formState = this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        filter(value => !value.hasOwnProperty('isTrusted'))
      )
      .subscribe(formState => {
        // console.log('formState', formState);
        this.onQueryChange(formState.query);
      });
    this.filtersChanged = this.filtersForm.valueChanges.subscribe(state => {
      this.paramsChange.emit(state);
    });
  }

  ngOnChanges({ query, searchParams }: SimpleChanges) {
    if (
      query &&
      query.currentValue &&
      query.currentValue.hasOwnProperty('length')
    ) {
      this.patchFormGroup(this.searchForm, { query: query.currentValue });
    }

    if (searchParams && searchParams.currentValue) {
      const { videoDuration, videoDefinition } = searchParams.currentValue;
      const values = {
        duration: videoDuration === 'long',
        hd: videoDefinition === 'high'
      };
      this.patchFormGroup(this.filtersForm, values);
    }
  }

  ngOnDestroy() {
    this.formState.unsubscribe();
  }

  patchFormGroup(form: FormGroup, values: { [key: string]: any }) {
    form.patchValue(values, { emitEvent: false });
  }

  onQueryChange(query: string) {
    this.queryChange.emit(query);
  }

  onSearch() {
    const searchFormState = this.searchForm.value;
    this.selectSuggestion(searchFormState.query);
  }

  handleSelectSuggestion(suggestion: string) {
    this.selectSuggestion(suggestion);
  }

  selectSuggestion(suggestion: string) {
    if (!suggestion.hasOwnProperty('isTrusted')) this.search.emit(suggestion);
  }

  clearFilters() {
    this.paramsChange.emit({ ...defaultSearchParams });
  }
}

export interface ISearchFormParams {
  duration: boolean;
  hd: boolean;
}
