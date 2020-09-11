import { MovieDto } from './MovieDto';

export class AddMovieDto {
  public uid: number;
  public collectionId: number;
  public movieId: number;

  constructor(uid: number, collectionId: number, movieId: number) {
    this.uid = uid;
    this.collectionId = collectionId;
    this.movieId = movieId;
  }
}
