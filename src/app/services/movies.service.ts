import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { MovieResults } from 'src/app/Models/MovieResults';
import { QueryFilter } from 'src/app/Models/QueryFilter';
import { MovieDbQuery } from 'src/app/Models/MovieDbQuery';
import { FactoryService } from './factory.service';
import { MOVIEAPI } from '../constants/StringConstants';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private API_PARAMS = MOVIEAPI;
  public movieSource = new Subject <MovieResults>();
  private activeCategory = this.API_PARAMS.Popular_Movies.apiParam;

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService, private pageService: PageService) {}

  public publishMovies(query: MovieDbQuery) : void {
    let movies: MovieResults;
    let queryString = `https://api.themoviedb.org/3/movie/${query.subcategory}?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${query.page}`;

    if (query.filter !== null) {
      queryString = this.addQueryFilters(queryString, query.filter);
    }

    this.httpClient.get(queryString).subscribe(
      (res: any) => {
        movies = this.factoryService.createMovieResults(this.activeCategory, res.results, res.total_pages);
        this.movieSource.next(movies);
      });
  }

  private addQueryFilters(queryString: string, filter: QueryFilter) : string {

    queryString += `&sort_by=${filter.sortBy}&include_adult=false&include_video=false`;

    if (filter.genre !== '-1') {
      queryString += `&with_genres=${filter.genre}`;
    }
    if (filter.year !== -1) {
        queryString += `&year=${filter.year}`;
    }

    return queryString;
  }

  public changeMovieCategory(category: string) : void {
    this.pageService.selectedPage = 1;
    this.activeCategory = category;
    let query = this.factoryService.createMovieDbQuery(category, null, this.pageService.selectedPage);

    this.publishMovies(query);
  }

  public getMoviesWithPage(pageNumber: number) {
    this.pageService.selectedPage = pageNumber;
    let query = this.factoryService.createMovieDbQuery(this.activeCategory, null, pageNumber);

    this.publishMovies(query);
  }

  public getMovieDetails(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fe154f97538186642f6f894b1181689f&language=en-US`);
  }

  public getAllGenres() {
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=fe154f97538186642f6f894b1181689f&language=en-US`);
  }

  public getTrendingMovies() {
    return this.httpClient.get('https://api.themoviedb.org/3/trending/movie/week?api_key=fe154f97538186642f6f894b1181689f');
  }

  public searchMovieByKeyword(keyword: string) {
    console.log(keyword);
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=fe154f97538186642f6f894b1181689f&language=en-US&query=${keyword}&page=1&include_adult=false`);
  }

  public getActiveCategory() {
    return this.activeCategory;
  }

}
