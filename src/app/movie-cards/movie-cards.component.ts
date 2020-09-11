import { Component, OnInit } from '@angular/core';
import { MOVIEAPI } from "../constants/StringConstants";
import { PageService } from '../services/page.service';
import { MoviesService } from '../services/movies.service';
import { MovieDbQueryDto } from '../contracts/TheMovieDB/DTOs/MovieDbQueryDto';
import { MovieResults } from '../models/TheMovieDB/MovieDBResults';
import { FactoryService } from '../services/factory.service';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { MovieDBMovie } from '../models/TheMovieDB/MovieDBMovie';

@Component({
  selector: 'app-movie-cards-shows',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.css']
})
export class MovieCardsComponent implements OnInit {

  public category: string;
  public movies: MovieDBMovie[] = [];
  public pagination: string[];

  constructor(private moviesService: MoviesService,
    private pageService: PageService, private factoryService: FactoryService,
    private movieCollections: MovieCollectionsService) { }

  ngOnInit() {
    this.category = this.moviesService.getActiveCategory();
    this.subscribeToMovieChanges();
    this.initializeMovieSource();
  }

  someMathe() {

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
    this.moviesService.getMoviesWithPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private initializeMovieSource() {
    let query = this.factoryService.createMovieDbQuery(this.category, this.pageService.selectedPage);

    this.moviesService.publishMovies(query);
  }

}
