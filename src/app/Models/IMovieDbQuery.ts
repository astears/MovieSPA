import { IQueryFilter } from './IQueryFilter';

export interface IMovieDbQuery {
  category: string
  subcategory: string,
  page: number,
  hasFilters: boolean,
  filter: IQueryFilter
}
