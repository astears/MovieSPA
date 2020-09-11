import { Injectable } from '@angular/core';
import { MovieDbQueryDto } from '../contracts/TheMovieDB/DTOs/MovieDbQueryDto';
import { MovieResults } from '../models/TheMovieDB/MovieDBResults';
import { NewCollectionDto } from '../contracts/zMoviesAPI/DTOs/NewCollectionDto';
import { MovieDto } from '../contracts/zMoviesAPI/DTOs/MovieDto';
import { AddMovieDto } from '../contracts/zMoviesAPI/DTOs/AddMovieDto';
import { RemoveMovieDto } from '../contracts/zMoviesAPI/DTOs/RemovieMovieDto';
import { EditCollectionInfoDto } from '../contracts/zMoviesAPI/DTOs/EditCollectionInfoDto';
import { RatingDto } from '../contracts/zMoviesAPI/DTOs/RatingDto';
import { WatchlistDto } from '../contracts/zMoviesAPI/DTOs/WatchlistDto';
import { FavoritesDto } from '../contracts/zMoviesAPI/DTOs/FavoritesDto';
import { DeleteCollectionDto } from '../contracts/zMoviesAPI/DTOs/DeleteCollectionDto';
import { DeleteMovieRatingDto } from '../contracts/zMoviesAPI/DTOs/DeleteMovieRatingDto';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() {}

  public createMovieDbQuery(subcategory: string, page: number) : MovieDbQueryDto {

    let query = new MovieDbQueryDto();
    query.subcategory = subcategory;
    query.page = page;

    return query;
  }

  public createMovieResults(category: string, results: any[], totalPages: number) : MovieResults {
    let movieResults = new MovieResults();

    movieResults.category = category;
    movieResults.results = results;
    movieResults.totalPages = totalPages;

    return movieResults;
  }

  public createNewCollectionDto(uid: number, name: string, desc: string) : NewCollectionDto{
    return new NewCollectionDto(uid, name, desc);
  }

  public createDeleteCollectionDto(collectionId: number) {
    return new DeleteCollectionDto(collectionId);
  }

  public createAddMovieDto(uid: number, collectionId: number, movieId: number) : AddMovieDto {
    return new AddMovieDto(uid, collectionId, movieId);
  }

  public createRemoveMovieDto(collectionId: number, movieId: number) : RemoveMovieDto {
    return new RemoveMovieDto(collectionId, movieId);
  }

  public createEditCollectionInfoDto(uid: number, id: number, name: string, description: string) : EditCollectionInfoDto {
    return new EditCollectionInfoDto(uid, id, name, description);
  }

  public createRatingDto(uid: number, value: number, review: string, movieId: number) : RatingDto {
    return new RatingDto(uid, value, review, movieId);
  }

  public createWatchlistDto(uid: number, movie: MovieDto) : WatchlistDto {
    return new WatchlistDto(uid, movie);
  }

  public createFavoritesDto(uid: number, movie: MovieDto) : FavoritesDto {
    return new FavoritesDto(uid, movie);
  }

  public createDeleteMovieRatingDto(uid: number, movieId: number) {
    return new DeleteMovieRatingDto(uid, movieId);
  }
}
