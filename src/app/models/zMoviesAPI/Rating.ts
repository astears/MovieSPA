import { User } from './User';
import { Movie } from './Movie';

export class Rating {
  movie: Movie;
  value: number;
  user: User;
  review: string;
}
