import { Injectable } from '@angular/core';
import { MovieDbQuery } from '../Models/MovieDbQuery';
import { MovieResults } from '../Models/MovieResults';
import { QueryFilter } from '../Models/QueryFilter';
import { NewCollectionDto } from '../DTOs/NewCollectionDto';
import { MovieDto } from '../DTOs/MovieDto';
import { AddMovieDto } from '../DTOs/AddMovieDto';
import { RemoveMovieDto } from '../DTOs/RemovieMovieDto';
import { EditCollectionInfoDto } from '../DTOs/EditCollectionInfoDto';
import { RatingDto } from '../DTOs/RatingDto';
import { WatchlistDto } from '../DTOs/WatchlistDto';
import { FavoritesDto } from '../DTOs/FavoritesDto';
import { GenreDto } from '../DTOs/GenreDto';
import { Movie } from '../Models/Movie';
import { IGenre } from '../Models/IGenre';
import { DeleteCollectionDto } from '../DTOs/DeleteCollectionDto';
import { DeleteMovieRatingDto } from '../DTOs/DeleteMovieRatingDto';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() {}

  public createMovieDbQuery(subcategory: string, filter: QueryFilter, page: number) : MovieDbQuery {

    let query = new MovieDbQuery();
    query.subcategory = subcategory;
    query.filter = filter;
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

  public createQueryFilter(genre: string, sortBy: string, year: number) : QueryFilter {
    let filter = new QueryFilter();
    filter.genre = genre;
    filter.sortBy = sortBy;
    filter.year = year;

    return filter;
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

  public createMovieDto(movie: Movie) : MovieDto {

    let genres = this.createGenreDtos(movie.genres);

      return new MovieDto(-1, movie.title, movie.overview, movie.runtime, movie.release_date,
        movie.imdb_id, movie.id, movie.backdrop_path, movie.poster_path, movie.budget,
        movie.original_language, movie.popularity, genres);
  }

  public createGenreDtos(genres: IGenre[]) : GenreDto[] {
    let genreDtos : GenreDto[] = [];

    genres.forEach((genre: IGenre) => {genreDtos.push(new GenreDto(genre.id, genre.name))});

    return genreDtos;
  }

  public createDeleteMovieRatingDto(uid: number, movieId: number) {
    return new DeleteMovieRatingDto(uid, movieId);
  }
}
