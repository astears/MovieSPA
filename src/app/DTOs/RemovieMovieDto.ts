import { MovieDto } from './MovieDto';
import { MovieDbQuery } from '../Models/MovieDbQuery';

export class RemoveMovieDto {
  public collectionId: number;
  public movie: MovieDto;

  constructor(collectionId: number, movie: MovieDto) {
    this.collectionId = collectionId;
    this.movie = movie;
  }
}
