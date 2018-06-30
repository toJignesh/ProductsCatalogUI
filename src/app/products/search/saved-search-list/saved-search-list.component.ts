import { SavedSearch } from './../../../models/saved-search';
import { SavedSearchService } from './../../../_services/saved-search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-search-list',
  templateUrl: './saved-search-list.component.html',
  styleUrls: ['./saved-search-list.component.css']
})
export class SavedSearchListComponent implements OnInit {
  searches: SavedSearch[];
  constructor(private savedSearchService: SavedSearchService) { }

  ngOnInit() {
    
    this.savedSearchService.savedSearchesObservable.subscribe(d=>{
      this.searches = d;
    });
  }

  loadSearch(ind:number):void{
    this.savedSearchService.loadSearch(ind);
  }

  removeSearch(ind:number):void{
    console.log('remove #', ind);
    this.savedSearchService.removeSearch(ind);
  }
}
