
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { SavedSearch } from '../models/saved-search';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  savedSearches:BehaviorSubject<SavedSearch[]>;
  private specificSearch: Subject<SavedSearch> = new Subject<SavedSearch>();
  
  searchCriteriaDefault: Subject<any> = new Subject<any>();

  
  ////savedSearchesObservable:Observable<SavedSearch[]>;
  specificSearchObservable: Observable<SavedSearch> = this.specificSearch.asObservable();

  constructor(private userService: UserService) {
    this.savedSearches=new BehaviorSubject<SavedSearch[]>(this.getCurrentSavedList());
    //this.savedSearchesObservable = this.savedSearches.asObservable();
    
  }

  saveSearch(ss: SavedSearch):void{
    let results: SavedSearch[]=this.getCurrentSavedList();
    if(results.length === 10){results = results.slice(1);}
    results.push(ss);

    let searchesString: string = JSON.stringify(results);

    localStorage.setItem('my-searches', searchesString);
    this.userService.saveProductSearches(searchesString);

    this.savedSearches.next(results);
  }

  loadSearch(ind: number):void{
    let results: SavedSearch[]=this.getCurrentSavedList();
    var savedSearch: SavedSearch;
    if(results.length >= ind){
      savedSearch = results[ind];
      this.specificSearch.next(savedSearch);
    }
  }

  setSearchCriteriaDefaults(criteria: any){
    this.searchCriteriaDefault.next(criteria);
  }

  removeSearch(ind: number):void{
    let results: SavedSearch[]=this.getCurrentSavedList();
    //if(results.length === 10){results = results.slice(1);}
    results.splice(ind, 1);
    let searchesString: string = JSON.stringify(results);

    localStorage.setItem('my-searches', searchesString);
    this.userService.saveProductSearches(searchesString);
    this.savedSearches.next(results);
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
