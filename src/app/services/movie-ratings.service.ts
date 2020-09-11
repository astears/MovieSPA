import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FactoryService } from './factory.service';
import { AuthService } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MovieDBMovie } from '../models/TheMovieDB/MovieDBMovie';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MovieRatingsService {
  private baseApiURL = 'http://localhost:5000/api/v1/ratings';

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService , private authService: AuthService) {}

  public getRatingsByMovieId(movieId: number) : Observable<any> {
    let url = this.baseApiURL + '/movie' + `/${movieId}`;

    return this.httpClient.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getRatingsByUserId() : Observable<any> {
    let url = this.baseApiURL + '/user' + `/${this.authService.getUid()}`;

    return this.httpClient.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addMovieRating(value: number, review: string, movie: MovieDBMovie) : Observable<any> {
    if (movie === null) {throwError('Movie data is empty')}
    let url = this.baseApiURL;
    let body = this.factoryService.createRatingDto(this.authService.getUid(), value, review, movie.id);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateMovieRating(value: number, review: string, movie: MovieDBMovie) : Observable<any> {
    let url = this.baseApiURL;
    let body = this.factoryService.createRatingDto(this.authService.getUid(), value, review, movie.id);

    return this.httpClient.put(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteMovieRating(movieId: number) {
    let url = this.baseApiURL + `/${this.authService.getUid()}/${movieId}`;

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
