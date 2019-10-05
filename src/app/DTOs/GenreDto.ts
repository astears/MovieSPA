export class GenreDto {
  public movieDbId: number;
  public name: string;

  constructor(movieDbId: number, name: string) {
    this.movieDbId = movieDbId;
    this.name = name;
  }
}
