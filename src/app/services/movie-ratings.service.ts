import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FactoryService } from './factory.service';
import { AuthService } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MovieDto } from '../DTOs/MovieDto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

export class MovieRatingsService {
  private baseApiURL = 'http://localhost:5000/api/ratings/';

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService , private authService: AuthService) {}

  public getRatingsByMovieId(movieId: number) : Observable<any> {
    let url = this.baseApiURL + 'movieratings' + `/${movieId}`;

    return this.httpClient.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getRatingsByUserId(uid: number) : Observable<any> {
    let url = this.baseApiURL + 'userratings' + `/${uid}`;

    return this.httpClient.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addMovieRating(uid: number, id: number, value: string, review: string, movie: MovieDto) : Observable<any> {
    let url = this.baseApiURL + 'rate';
    let body = this.factoryService.createRatingDto(uid, id, value, review, movie);

    return this.httpClient.post(url, body, httpOptions)
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
