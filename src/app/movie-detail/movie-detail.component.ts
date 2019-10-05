import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { MoviesService} from '../services/movies.service';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { FactoryService } from '../services/factory.service';
import { Movie } from '../Models/Movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private movieId: number;
  movie: Movie = new Movie();
  backgroundStyle: any = {};

  constructor(private routes: ActivatedRoute,
              private moviesService: MoviesService,
              private movieCollections: MovieCollectionsService){ }

  ngOnInit() {
    this.movieId = this.routes.snapshot.params['id'];

    this.moviesService.getMovieDetails(this.movieId).subscribe(
      (movieInfo: Movie) => {
        this.movie = movieInfo;
        this.setBackgroundStyle();
      }
    );
  }

  public addToFavorites() {
    this.movieCollections.addToFavorites(this.movie).subscribe(
      (res: any) => {
        console.log("Success!");
    },
      (error: any) => {
        console.error(error);
    });
  }

  public addToWatchlist() {
    this.movieCollections.addToWatchlist(this.movie).subscribe(
      (res: any) => {
        console.log("Success!");
    },
      (error: any) => {
        console.error(error);
    });
  }

  public showCollections() {
    this.movieCollections.getCollectionsByUser().subscribe(
      (res: any) => {
        console.log(res);
    },
      (error: any) => {
        console.error(error);
    });
  }

  public showRatingOptions() {

  }

  setBackgroundStyle() {
    this.backgroundStyle = {
      'width': '100%',
      'height': '-webkit-fill-available',
      'background': `linear-gradient(rgba(3.14%, 14.51%, 40.39%, 0.98), rgba(3.14%, 14.51%, 40.39%, 0.68)),
                      url(https://image.tmdb.org/t/p/w1400_and_h450_face/${this.movie.backdrop_path})`,
      'background-size': 'cover',
      'background-position-x': 'center'
    };
  }

}
