import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FactoryService } from './factory.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MovieDto } from '../DTOs/MovieDto';
import { MovieCollection } from '../Models/MovieCollection';
import { Movie } from '../Models/Movie';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionsService {
  private baseApiURL = 'http://localhost:5000/api/moviecollections/';

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService , private authService: AuthService) {}

  public createNewCollection(name: string, desc: string) : Observable<any> {
    let url = this.baseApiURL + 'createcollection';
    let body = this.factoryService.createNewCollectionDto(this.authService.getUid(), name, desc);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteCollection(collectionId: number) {
    let url = this.baseApiURL + 'deletecollection';
    let body = this.factoryService.createDeleteCollectionDto(collectionId);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public addMovieToCollection(collectionId: number, movie: Movie) : Observable<any> {
    let url = this.baseApiURL + 'addMovie';

    let movieDto = this.factoryService.createMovieDto(movie);
    let body = this.factoryService.createAddMovieDto(this.authService.getUid(), collectionId, movieDto)

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public removeMovieFromCollection(collectionId: number, movieId: number) : Observable<any> {
    let url = this.baseApiURL + 'removeMovie';
    let body = this.factoryService.createRemoveMovieDto(collectionId, movieId);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public editCollectionInfo(id: number, name: string, description: string) : Observable<any> {
    let url = this.baseApiURL + 'editCollection';
    let body = this.factoryService.createEditCollectionInfoDto(this.authService.getUid(), id, name, description);
    console.log(body);
    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCollectionsByUser() : Observable<MovieCollection[]> {
    let url = this.baseApiURL + this.authService.getUid();

    return this.httpClient.get<MovieCollection[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getCollectionById(collectionId: number): Observable<MovieCollection> {
    let url = this.baseApiURL + this.authService.getUid() + "/collectionId" + `/${collectionId}`;

    return this.httpClient.get<MovieCollection>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getCollectionByName(collectionName: string): Observable<MovieCollection> {
    let url = this.baseApiURL + this.authService.getUid() + "/collectionName" + `/${collectionName}`;

    return this.httpClient.get<MovieCollection>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addToFavorites(movie: Movie) : Observable<any> {
    let url = this.baseApiURL + 'favorites';

    let movieDto = this.factoryService.createMovieDto(movie);
    let body = this.factoryService.createFavoritesDto(this.authService.getUid(), movieDto);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public addToWatchlist(movie: Movie) : Observable<any> {
    let url = this.baseApiURL + 'watchlist';

    let movieDto = this.factoryService.createMovieDto(movie);
    let body = this.factoryService.createWatchlistDto(this.authService.getUid(), movieDto);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public removeFromFavorites(movie: Movie) : Observable<any> {
    let url = this.baseApiURL + 'favorites/remove/' + `${this.authService.getUid()}`;

    let body = this.factoryService.createMovieDto(movie);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public removeFromWatchlist(movie: Movie) : Observable<any> {
    let url = this.baseApiURL + 'watchlist/remove/' + `${this.authService.getUid()}`;

    let body = this.factoryService.createMovieDto(movie);

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
