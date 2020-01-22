import { Movie } from './Movie';
import { User } from './User';

export class MovieCollection {
  id: number;
  name: string;
  description: string;
  movies: Movie[];
  user: User;
}
