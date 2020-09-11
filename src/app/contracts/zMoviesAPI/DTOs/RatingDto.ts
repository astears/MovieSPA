import { MovieDto } from './MovieDto';

export class RatingDto {
  public uid: number;
  public value: number;
  public review: string;
  public movieId: number;

  constructor(uid: number, value: number, review: string, movieId: number) {

      this.uid = uid;
      this.value = value;
      this.review = review;
      this.movieId = movieId;
  }
}
