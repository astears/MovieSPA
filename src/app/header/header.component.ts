import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieLists } from '../enums/MovieListEnums';
import { MoviesService } from '../services/search-movies-service/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  opencategorys: string = '';

  constructor(private searchMoviesService: MoviesService) {
  }

  changeCategory(event: MouseEvent) {
    let clickedCategory: string = (event.srcElement as Element).id;
    this.searchMoviesService.changeCategory(clickedCategory);
  }

}
