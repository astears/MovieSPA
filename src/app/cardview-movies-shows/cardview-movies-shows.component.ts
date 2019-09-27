import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { MovieLists } from '../enums/MovieListEnums';
import { PageService } from '../services/search-movies-service/page.service';
import { MoviesService } from '../services/search-movies-service/movies.service';

@Component({
  selector: 'app-cardview-movies-shows',
  templateUrl: './cardview-movies-shows.component.html',
  styleUrls: ['./cardview-movies-shows.component.css']
})
export class CardViewMoviesShowsComponent implements OnInit {

  category: string;
  movies: any[] = [];
  pagination: string[];

  constructor(private moviesService: MoviesService,
    private pageService: PageService) { }

  ngOnInit() {
    this.category = MovieLists.PopularMovies;
    this.subscribeToMovieChanges();
    this.moviesService.getMoviesByCategory(this.category, this.pageService.selectedPage);

  }

  subscribeToMovieChanges() {
    this.moviesService.movies.subscribe(
      (movies: any) => {
        this.movies = movies.results;
        this.category = movies.category;
        this.pagination = this.pageService.configurePagination(movies.total_pages);
      }
    );
  }

  changePage(event: MouseEvent) {

    let pageNumber: number;
    pageNumber = this.pageService.getPageNumber((event.srcElement as Element).textContent);

    this.pageService.selectedPage = pageNumber;
    this.moviesService.getMoviesByCategory(this.category, this.pageService.selectedPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
