import { MovieDto } from './MovieDto';
import { MovieDbQueryDto } from '../../TheMovieDB/DTOs/MovieDbQueryDto';

export class RemoveMovieDto {
  public collectionId: number;
  public movieId: number;

  constructor(collectionId: number, movieId: number) {
    this.collectionId = collectionId;
    this.movieId = movieId;
  }
}
