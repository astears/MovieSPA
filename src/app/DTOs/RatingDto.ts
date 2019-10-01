import { MovieDto } from './MovieDto';

export class RatingDto {
  public uid: number;
  public id: number;
  public value: string;
  public review: string;
  public movie: MovieDto;

  constructor(uid: number, id: number, value: string, review: string, movie: MovieDto) {
      this.id = id;
      this.uid = uid;
      this.value = value;
      this.review = review;
      this.movie = movie;
  }
}
