import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FactoryService } from './factory.service';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MovieDto } from '../DTOs/MovieDto';
import { MovieCollection } from '../Models/MovieCollection';

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

  public addMovieToCollection(collectionId: number, movie: MovieDto) : Observable<any> {
    let url = this.baseApiURL + 'addMovie';
    let body = this.factoryService.createAddMovieDto(this.authService.getUid(), collectionId, movie)

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public removeMovieFromCollection(collectionId: number, movie: MovieDto) : Observable<any> {
    let url = this.baseApiURL + 'removeMovie';
    let body = this.factoryService.createRemoveMovieDto(collectionId, movie);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public editCollectionInfo(id: number, name: string, description: string) : Observable<any> {
    let url = this.baseApiURL + 'editCollection';
    let body = this.factoryService.createEditCollectionInfoDto(this.authService.getUid(), id, name, description);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCollectionsByUser(uid: number) : Observable<any> {
    let url = this.baseApiURL + `${uid}`;

    return this.httpClient.get<any>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public addToFavorites(collectionId: number, movie: MovieDto) : Observable<any> {
    let url = this.baseApiURL + 'favorites';
    let body = this.factoryService.createAddMovieDto(this.authService.getUid(), collectionId, movie);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public addToWatchlist(collectionId: number, movie: MovieDto) : Observable<any> {
    let url = this.baseApiURL + 'watchlist';
    let body = this.factoryService.createAddMovieDto(this.authService.getUid(), collectionId, movie);

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
  };
}
