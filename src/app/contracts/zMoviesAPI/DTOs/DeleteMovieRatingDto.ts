export class DeleteMovieRatingDto {
  uid: number;
  movieId: number;

  constructor(uid: number, movieId: number) {
    this.uid = uid;
    this.movieId = movieId;
  }
}
