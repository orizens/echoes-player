import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/common'; 
      
@Component({
  selector: 'player-search',
  template: `
    <div class="search-panel">
      <form class="navbar-form form-search navbar-left" id="media-explorer">
        <div class="form-group">
          <input placeholder="Explore Media" id="media-search" type="search" class="form-control" autocomplete="off" name="media-search"
            [(ngModel)]="searchQuery"
            (input)="onQueryChange()"
            >
          <button class="btn btn-transparent btn-submit" type="submit" title="search with echoes"
            (click)="onSearch()">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  `,
  directives: [ NgForm ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerSearch implements OnInit {
  @Input() query;
  @Output() change = new EventEmitter();
  @Output() search = new EventEmitter();

  private searchQuery: string = '';

  constructor() { }

  ngOnInit() {
    this.searchQuery = this.query.query;
  }

  onQueryChange() {
    this.change.next(this.searchQuery);
  }

  onSearch() {
    this.search.next(this.searchQuery);
  }
}