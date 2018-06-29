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
      console.log('from here',d)
      this.searches = d;
    });
  }

  saveSearch(){
    console.log('event fired');
    this.savedSearchService.saveSearch(Object.assign({type:'test',criteria:{ a:'b',c:'d',e:'f'}}));
  }

  loadSearch(ind:number):void{
    console.log('loading search# ' + ind);
    this.savedSearchService.loadSearch(ind);
  }
}
