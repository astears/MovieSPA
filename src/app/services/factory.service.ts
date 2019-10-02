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

  public createAddMovieDto(uid: number, collectionId: number, movie: MovieDto) : AddMovieDto {
    return new AddMovieDto(uid, collectionId, movie);
  }

  public createRemoveMovieDto(collectionId: number, movie: MovieDto) : RemoveMovieDto {
    return new RemoveMovieDto(collectionId, movie);
  }

  public createEditCollectionInfoDto(uid: number, id: number, name: string, description: string) : EditCollectionInfoDto {
    return new EditCollectionInfoDto(uid, id, name, description);
  }

  public createRatingDto(uid: number, id: number, value: string, review: string, movie: MovieDto) : RatingDto {
    return new RatingDto(uid, id, value, review, movie);
  }
}
