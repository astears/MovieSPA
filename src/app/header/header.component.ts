import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MOVIEAPI } from '../constants/StringConstants';

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

  constructor(private searchMoviesService: MoviesService) {}

  public ngOnInit() {
    this.searchMoviesService.getTrendingMovies().subscribe(
      (data: any) => {
        this.trendingMovies = data.results.slice(0,10);
        console.log(this.trendingMovies);
      }, (err: any) => {console.error(err);}

    );
  }

  changeCategory(event: MouseEvent) {
    let clickedCategory: string = (event.srcElement as Element).id;
    let apiValue = MOVIEAPI[clickedCategory].apiParam;
    this.searchMoviesService.changeMovieCategory(apiValue);
  }

}
