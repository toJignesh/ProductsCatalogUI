import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-saved-search-item',
  templateUrl: './saved-search-item.component.html',
  styleUrls: ['./saved-search-item.component.css']
})
export class SavedSearchItemComponent implements OnInit {
  @Input() itemIndex:number;
  @Input() displayText: string;
  constructor() { }

  ngOnInit() {
  }

  loadSearch(){}
}
