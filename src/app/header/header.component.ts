import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { MOVIEAPI } from '../constants/StringConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private opencategorys: string = '';
  private APIParams = MOVIEAPI;

  constructor(private searchMoviesService: MoviesService) {
  }

  changeCategory(event: MouseEvent) {
    let clickedCategory: string = (event.srcElement as Element).id;
    let apiValue = MOVIEAPI[clickedCategory].apiParam;
    this.searchMoviesService.changeMovieCategory(apiValue);
  }

}
