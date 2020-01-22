import { MovieDto } from './MovieDto';

export class AddMovieDto {
  public uid: number;
  public collectionId: number;
  public movie: MovieDto;

  constructor(uid: number, collectionId: number, movie: MovieDto) {
    this.uid = uid;
    this.collectionId = collectionId;
    this.movie = movie;
  }
}
