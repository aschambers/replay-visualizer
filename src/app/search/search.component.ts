import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';

  filterResults(event: Event): void {
    this.searchValue = (event.target as any).value;
  }
}
