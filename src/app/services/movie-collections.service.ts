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
  private baseApiURL = 'http://localhost:5000/api/v1/collections';

  constructor(private httpClient: HttpClient,
    private factoryService: FactoryService , private authService: AuthService) {}

  public createNewCollection(name: string, desc: string) : Observable<any> {
    let url = this.baseApiURL;
    let body = this.factoryService.createNewCollectionDto(this.authService.getUid(), name, desc);

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteCollection(collectionId: number) {
    let url = this.baseApiURL + '/' + collectionId;

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public addMovieToCollection(collectionId: number, movie: Movie) : Observable<any> {
    let url = this.baseApiURL + '/' + collectionId + '/movie/' + movie.id;

    let movieDto = this.factoryService.createMovieDto(movie);
    let body = this.factoryService.createAddMovieDto(this.authService.getUid(), collectionId, movieDto)

    return this.httpClient.post(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public removeMovieFromCollection(collectionId: number, movieId: number) : Observable<any> {
    let url = this.baseApiURL + '/' + collectionId + '/movie/' + movieId;

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public editCollectionInfo(collectionId: number, name: string, description: string) : Observable<any> {
    let url = this.baseApiURL + `/${collectionId}`;
    let body = this.factoryService.createEditCollectionInfoDto(this.authService.getUid(), collectionId, name, description);

    return this.httpClient.put(url, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getCollectionsByUser() : Observable<MovieCollection[]> {
    let url = this.baseApiURL + '/user/' + this.authService.getUid();

    return this.httpClient.get<MovieCollection[]>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getCollectionById(collectionId: number): Observable<MovieCollection> {
    let url = this.baseApiURL + `/${collectionId}`;

    return this.httpClient.get<MovieCollection>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getCollectionByName(collectionName: string): Observable<MovieCollection> {
    let url = this.baseApiURL + `/${collectionName}`;

    return this.httpClient.get<MovieCollection>(url, httpOptions)
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
