import { Injectable } from '@angular/core';
import { MovieDbQuery } from '../Models/MovieDbQuery';
import { MovieResults } from '../Models/MovieResults';
import { QueryFilter } from '../Models/QueryFilter';
import { NewCollectionDto } from '../DTOs/NewCollectionDto';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor() {}

  public createMovieDbQuery(subcategory: string, filter: QueryFilter, page: number) {

    let query = new MovieDbQuery();
    query.subcategory = subcategory;
    query.filter = filter;
    query.page = page;

    return query;
  }

  public createMovieResults(category: string, results: any[], totalPages: number) {
    let movieResults = new MovieResults();

    movieResults.category = category;
    movieResults.results = results;
    movieResults.totalPages = totalPages;

    return movieResults;
  }

  public createQueryFilter(genre: string, sortBy: string, year: number) {
    let filter = new QueryFilter();
    filter.genre = genre;
    filter.sortBy = sortBy;
    filter.year = year;

    return filter;
  }

  public createNewCollectionDto(uid: number, name: string, desc: string) {
    return new NewCollectionDto(uid, name, desc);
  }
}
