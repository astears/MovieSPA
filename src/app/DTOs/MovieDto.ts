import { GenreDto } from './GenreDto';

export class MovieDto {
    public Id: number;
    public Title: string;
    public Overview: string;
    public Runtime: number;
    public ReleaseDate: string;
    public ImdbID: string;
    public MovieDbId: number;
    public BackdropURL: string;
    public PosterURL: string;
    public Budget: number;
    public Language: string;
    public Popularity: number;
    public Genres: GenreDto[];

    constructor(id: number, title: string, overview: string, runtime: number, releaseDate: string,
      imdbId: string, movieDbId: number, backdropUrl: string, posterUrl: string, budget: number,
      language: string, popularity: number, genres: GenreDto[]) {

        this.Id = id;
        this.Title = title;
        this.Overview = overview;
        this.Runtime = runtime;
        this.ReleaseDate = releaseDate;
        this.ImdbID = imdbId;
        this.MovieDbId = movieDbId;
        this.BackdropURL = backdropUrl;
        this.PosterURL = posterUrl;
        this.Budget = budget;
        this.Language = language;
        this.Popularity = popularity;
        this.Genres = genres;

    }
}
