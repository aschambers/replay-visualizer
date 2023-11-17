import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() filterReplays = new EventEmitter<string>();
  searchValue: string = '';

  filterResults(event: Event): void {
    this.searchValue = (event.target as any).value;
    this.filterReplays.emit(this.searchValue);
  }
}
