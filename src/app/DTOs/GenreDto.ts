export class GenreDto {
  public movieDbId: string;
  public name: string;

  constructor(movieDbId: string, name: string) {
    this.movieDbId = movieDbId;
    this.name = name;
  }
}
