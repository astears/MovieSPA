import { Genre } from './Genre';

export class Movie {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  releaseDate: string;
  imdbID: string;
  movieDbId: number;
  backdropURL: string;
  posterURL: string;
  budget: number;
  language: string;
  popularity: number;
  genres: Genre[];
}
