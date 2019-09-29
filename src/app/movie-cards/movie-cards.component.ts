import { Component, OnInit } from '@angular/core';
import { MOVIEAPI } from "../constants/StringConstants";
import { MovieLists } from '../enums/MovieListEnums';
import { PageService } from '../services/page.service';
import { MoviesService } from '../services/movies.service';
import { IMovieDbQuery } from '../Models/IMovieDbQuery';
import { IMovieResults } from '../Models/IMovieResults';

@Component({
  selector: 'app-movie-cards-shows',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {

  category: string;
  movies: any[] = [];
  pagination: string[];

  constructor(private moviesService: MoviesService,
    private pageService: PageService) { }

  ngOnInit() {
    this.category = MovieLists.PopularMovies;
    this.subscribeToMovieChanges();
    this.initializeMovieSource();

  }

  private subscribeToMovieChanges() {
    this.moviesService.movieSource.subscribe(
      (movies: IMovieResults) => {
        this.movies = movies.results;
        this.category = movies.category;
        this.pagination = this.pageService.configurePagination(movies.totalPages);
      }
    );
  }

  private changePage(event: MouseEvent) {

    let pageNumber = this.pageService.getPageNumber((event.srcElement as Element).textContent);

    this.pageService.selectedPage = pageNumber;

    this.moviesService.getMoviesWithPage(this.pageService.selectedPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private initializeMovieSource() {
    let query: IMovieDbQuery;

    query.subcategory = MOVIEAPI.PopularMovies.subcategory;
    query.hasFilters = false;
    query.filter = null;
    query.page = 1;

    this.moviesService.publishMovies(query);
  }

}
