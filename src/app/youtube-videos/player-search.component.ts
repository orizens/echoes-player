import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/common';

import './player-search.less';

@Component({
  selector: 'player-search',
  template: `
    <form class="navbar-form form-search" id="media-explorer"
      (ngSubmit)="onSearch(mediaSearch.value)">
      <div class="form-group clearfix">
        <input placeholder="Explore Media" id="media-search" 
          type="search" class="form-control" autocomplete="off"
          [value]="searchQuery.query" #mediaSearch name="mediaSearch"
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
export class PlayerSearch implements OnInit {
  @Input() query;
  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();

  private searchQuery = {
    query: ''
  };

  @ViewChild('mediaSearch') mediaSearch;

  constructor() { }

  ngOnInit() {
    this.searchQuery.query = this.query.query;
    // console.log(this.mediaSearch);
  }

  onQueryChange(query: string) {
    this.change.next(query);
  }

  onSearch(query: string) {
    this.mediaSearch.nativeElement.blur();
    this.search.next(query);
  }
}
