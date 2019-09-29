import { Component, OnInit } from '@angular/core';
import { MOVIEAPI } from "../constants/StringConstants";
import { MovieLists } from '../enums/MovieListEnums';
import { PageService } from '../services/page.service';
import { MoviesService } from '../services/movies.service';
import { MovieDbQuery } from '../Models/MovieDbQuery';
import { MovieResults } from '../Models/MovieResults';
import { FactoryService } from '../services/factory.service';

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
    private pageService: PageService, private factoryService: FactoryService) { }

  ngOnInit() {
    this.subscribeToMovieChanges();
    this.initializeMovieSource();

  }

  private subscribeToMovieChanges() {
    this.moviesService.movieSource.subscribe(
      (movies: MovieResults) => {
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
    let query = this.factoryService.createMovieDbQuery(MOVIEAPI.Popular_Movies.apiParam, null, 1);

    this.moviesService.publishMovies(query);
  }

}
