import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { MovieResults } from 'src/app/models/TheMovieDB/MovieDBResults';
import { MovieDbQueryDto } from 'src/app/contracts/TheMovieDB/DTOs/MovieDbQueryDto';
import { FactoryService } from './factory.service';
import { MOVIEAPI } from '../constants/StringConstants';
import { PageService } from './page.service';
import { Movie } from '../models/zMoviesAPI/Movie';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private API_PARAMS = MOVIEAPI;
  public movieSource = new Subject <MovieResults>();
  private activeCategory = this.API_PARAMS.Popular_Movies.apiParam;

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService, private pageService: PageService) {}

  public publishMovies(query: MovieDbQueryDto) : void {
    let movies: MovieResults;
    let queryString = `https://api.themoviedb.org/3/movie/${query.subcategory}?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${query.page}`;

    this.httpClient.get(queryString)
      .subscribe(
        (res: any) => {
          console.log(res);
          movies = this.factoryService.createMovieResults(this.activeCategory, res.results, res.total_pages);
          this.movieSource.next(movies);
        });
  }

  public changeMovieCategory(category: string) : void {
    this.pageService.selectedPage = 1;
    this.activeCategory = category;
    let query = this.factoryService.createMovieDbQuery(category, this.pageService.selectedPage);

    this.publishMovies(query);
  }

  public getMoviesWithPage(pageNumber: number) {
    this.pageService.selectedPage = pageNumber;
    let query = this.factoryService.createMovieDbQuery(this.activeCategory, pageNumber);

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

  public getMovieBackdrop(movieId: number) : Observable<string> {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fe154f97538186642f6f894b1181689f&language=en-US`).pipe(pluck('backdropPath'));
  }

  public getActiveCategory() {
    return this.activeCategory;
  }

}
