import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { PageService } from './page.service';
import { IMovieResults } from 'src/app/Models/IMovieResults';
import { IQueryFilter } from 'src/app/Models/IQueryFilter';
import { IMovieDbQuery } from 'src/app/Models/IMovieDbQuery';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public movieSource = new Subject <IMovieResults>();
  private activeCategory = "";

  constructor(private httpClient: HttpClient) {}

  public publishMovies(query: IMovieDbQuery) : void {

    let movies: IMovieResults;
    let queryString = `https://api.themoviedb.org/3/movie/${query.subcategory}?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${query.page}`;

    if (query.hasFilters) {
      queryString = this.addQueryFilters(queryString, query.filter);
    }

    this.httpClient.get(queryString).subscribe(
      (response: any) => {
        movies.results = response.results;
        movies.totalPages = response.total_pages;
        movies.category = this.activeCategory;

        this.movieSource.next(movies);
      });
  }

  private addQueryFilters(queryString: string, filter: IQueryFilter) : string {

    queryString += `&sort_by=${filter.sortBy}&include_adult=false&include_video=false`;

    if (filter.genre !== '-1') {
      queryString += `&with_genres=${filter.genre}`;
    }
    if (filter.year !== -1) {
        queryString += `&year=${filter.year}`;
    }

    return queryString;
  }

  public changeMovieCategory(subCategory: string) : void {
    let query: IMovieDbQuery;
    this.activeCategory = query.subcategory;

    query.subcategory = subCategory;
    query.hasFilters = false;
    query.page = 1;
    query.filter = null;

    this.publishMovies(query);
  }

  public getMoviesWithPage(pageNumber: number) {
    let query: IMovieDbQuery;

    query.subcategory = this.activeCategory;
    query.page = pageNumber;
    query.hasFilters = false;
    query.filter = null;

    this.publishMovies(query);
  }

  public getMovieDetails(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fe154f97538186642f6f894b1181689f&language=en-US`);
  }

  public getAllGenres() {
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=fe154f97538186642f6f894b1181689f&language=en-US`);
  }

  public getActiveCategory() {
    return this.activeCategory;
  }

}
