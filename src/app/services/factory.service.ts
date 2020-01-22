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
import { GenreDto } from '../contracts/zMoviesAPI/DTOs/GenreDto';
import { Movie } from '../models/zMoviesAPI/Movie';
import { Genre } from '../models/zMoviesAPI/Genre';
import { DeleteCollectionDto } from '../contracts/zMoviesAPI/DTOs/DeleteCollectionDto';
import { DeleteMovieRatingDto } from '../contracts/zMoviesAPI/DTOs/DeleteMovieRatingDto';
import { MovieDBMovie } from '../models/TheMovieDB/MovieDBMovie';
import { MovieDBGenre } from '../models/TheMovieDB/MovieDBGenre';

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

  public createAddMovieDto(uid: number, collectionId: number, movie: MovieDto) : AddMovieDto {
    return new AddMovieDto(uid, collectionId, movie);
  }

  public createRemoveMovieDto(collectionId: number, movieId: number) : RemoveMovieDto {
    return new RemoveMovieDto(collectionId, movieId);
  }

  public createEditCollectionInfoDto(uid: number, id: number, name: string, description: string) : EditCollectionInfoDto {
    return new EditCollectionInfoDto(uid, id, name, description);
  }

  public createRatingDto(uid: number, value: number, review: string, movie: MovieDto) : RatingDto {
    return new RatingDto(uid, value, review, movie);
  }

  public createWatchlistDto(uid: number, movie: MovieDto) : WatchlistDto {
    return new WatchlistDto(uid, movie);
  }

  public createFavoritesDto(uid: number, movie: MovieDto) : FavoritesDto {
    return new FavoritesDto(uid, movie);
  }

  public createMovieDto(movie: MovieDBMovie) : MovieDto {

    let genres = this.createGenreDtos(movie.genres);

      return new MovieDto(-1, movie.title, movie.overview, movie.runtime, movie.release_date,
        movie.imdb_id, movie.id, movie.backdrop_path, movie.poster_path, movie.budget,
        movie.original_language, movie.popularity, genres);
  }

  public createGenreDtos(genres: MovieDBGenre[]) : GenreDto[] {
    let genreDtos : GenreDto[] = [];

    genres.forEach((genre: Genre) => {genreDtos.push(new GenreDto(genre.id, genre.name))});

    return genreDtos;
  }

  public createDeleteMovieRatingDto(uid: number, movieId: number) {
    return new DeleteMovieRatingDto(uid, movieId);
  }
}
