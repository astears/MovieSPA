import { MovieDto } from './MovieDto';

export class RatingDto {
  public uid: number;
  public value: number;
  public review: string;
  public movie: MovieDto;

  constructor(uid: number, value: number, review: string, movie: MovieDto) {

      this.uid = uid;
      this.value = value;
      this.review = review;
      this.movie = movie;
  }
}
