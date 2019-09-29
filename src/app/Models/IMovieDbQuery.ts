import { IQueryFilter } from './IQueryFilter';

export class IMovieDbQuery {

  subcategory: string;
  page: number;
  hasFilters: boolean;
  filter: IQueryFilter;
}
