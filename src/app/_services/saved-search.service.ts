
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SavedSearch } from '../models/saved-search';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  private savedSearches:BehaviorSubject<SavedSearch[]>;
  private specificSearch: Subject<SavedSearch> = new Subject<SavedSearch>();
  private searchTypeSub: Subject<string>=new Subject<string>();

  searchTypeObs: Observable<string> = this.searchTypeSub.asObservable();
  savedSearchesObservable:Observable<SavedSearch[]>;
  specificSearchObservable: Observable<SavedSearch> = this.specificSearch.asObservable();

  constructor() {
    this.savedSearches=new BehaviorSubject<SavedSearch[]>(this.getCurrentSavedList());
    this.savedSearchesObservable = this.savedSearches.asObservable();
  }

  saveSearch(ss: SavedSearch):void{
    let results: SavedSearch[]=this.getCurrentSavedList();
    if(results.length === 10){results = results.slice(1);}
    results.push(ss);
    localStorage.setItem('my-searches', JSON.stringify(results));
    this.savedSearches.next(results);
  }

  loadSearch(ind: number):void{
    let results: SavedSearch[]=this.getCurrentSavedList();
    var savedSearch: SavedSearch;
    if(results.length >= ind){
      savedSearch = results[ind];
      this.specificSearch.next(savedSearch);
      // this.searchTypeSub.next(savedSearch.searchType);
    }
    
  }
  getAllSearches():SavedSearch[]{
    let results: SavedSearch[]=[];
    let allSearches = localStorage.getItem('my-searches');
    if(allSearches){
      results = JSON.parse(allSearches);
    }


    return null;
  }

  private getCurrentSavedList():SavedSearch[]{
    let results: SavedSearch[]=[];
    let allSearches = localStorage.getItem('my-searches');
    if(allSearches){
      results = JSON.parse(allSearches);
    }
    return results;
  }
  
}
