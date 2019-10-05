import { IGenre } from './IGenre';

export class Movie {
    title: string;
    overview: string;
    runtime: number;
    release_date: string;
    imdb_id: string;
    id: number;
    backdrop_path: string;
    poster_path: string;
    budget: number;
    original_language: string;
    popularity: number;
    genres: IGenre[];
}
