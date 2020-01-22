import { MovieDto } from './MovieDto';

export class FavoritesDto {
  public uid: number;
  public movie: MovieDto;

  constructor(uid: number, movie: MovieDto) {
    this.uid = uid;
    this.movie = movie;
  }
}
