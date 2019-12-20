import { MovieDto } from './MovieDto';
import { MovieDbQuery } from '../Models/MovieDbQuery';

export class RemoveMovieDto {
  public collectionId: number;
  public movieId: number;

  constructor(collectionId: number, movieId: number) {
    this.collectionId = collectionId;
    this.movieId = movieId;
  }
}
