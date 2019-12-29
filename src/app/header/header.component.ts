import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MOVIEAPI } from '../constants/StringConstants';
import { Subject, Observable } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private opencategorys: string = '';
  private APIParams = MOVIEAPI;
  trendingMovies: any[];
  showSearchResults = false;
  search$ = new Subject<string>();

  constructor(private searchMoviesService: MoviesService) {}

  public ngOnInit() {
    this.searchMoviesService.getTrendingMovies().subscribe(
      (data: any) => {
        this.trendingMovies = data.results;
        console.log(this.trendingMovies);
      }, (err: any) => {console.error(err);}
    );

    this.search$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => term !== '' ? this.searchMoviesService.searchMovieByKeyword(term) : this.searchMoviesService.getTrendingMovies()),
      tap(term => console.log(term))
    ).subscribe(
      (data: any) => {
        this.trendingMovies = data.results;
      }, (err: any) => {console.error(err);}
    );

  }

  changeCategory(event: MouseEvent) {
    let clickedCategory: string = (event.srcElement as Element).id;
    let apiValue = MOVIEAPI[clickedCategory].apiParam;
    this.searchMoviesService.changeMovieCategory(apiValue);
  }

}
