import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { MoviesService} from '../services/movies.service';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { Movie } from '../Models/Movie';
import { MovieRatingsService } from '../services/movie-ratings.service';
import { MovieCollection } from '../Models/MovieCollection';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private movieId: number;
  movie: Movie = new Movie();
  collections: MovieCollection[];
  selectedCollection: MovieCollection;
  backgroundStyle: any = {};
  isFavorite = false;
  isRated = false;
  isWatchlisted = false;
  success = false;
  displayPopup = false;
  showCollections = false;
  showRatings = false;
  starRatings = [false, false, false, false, false];

  constructor(private routes: ActivatedRoute,
              private moviesService: MoviesService,
              private movieCollectionsService: MovieCollectionsService,
              private ratingsService: MovieRatingsService){ }

  ngOnInit() {
    this.movieId = this.routes.snapshot.params['id'];

    // Get movie details
    this.moviesService.getMovieDetails(this.movieId).subscribe(
      (movieInfo: Movie) => {
        this.movie = movieInfo;
        this.getUsersActionsOnMovie();
        this.setBackgroundStyle();
      }
    );

  }

  public getUsersActionsOnMovie() {
    // Get user ratings, to see if user has rated this movie
    this.ratingsService.getRatingsByUserId().subscribe(
      (ratings: any) => {
        ratings.movieRatingsByUser.forEach(rating => {
          if (rating.movie.movieDbId === this.movie.id) {
            this.isRated = true;
            this.fillStarRatings(rating.rating.value);
          }
        });
      }, (err: any) => {console.error(err)}
    );

    // Get all collections for this user, check if favorite or watchlisted
    this.movieCollectionsService.getCollectionsByUser().subscribe(
      (collections: MovieCollection[]) => {
        this.collections = collections;
        this.selectedCollection = this.collections[0];
        this.checkIsFavoriteIsWatchlist()
      }, (error: any) => {console.error(error);}
    );
  }

  public checkIsFavoriteIsWatchlist() {
    console.log(this.collections);
    console.log(this.movie)
    this.collections.forEach(collection => {
      if (collection.name === 'Favorites') {
        collection.movieToMovieCollections.forEach(mmc => {
          if (mmc.movie.movieDbId === this.movie.id) {
            this.isFavorite = true;
          }
        });
      }
      else if (collection.name === 'Watchlist') {
        collection.movieToMovieCollections.forEach(mmc => {
          if (mmc.movie.movieDbId === this.movie.id) {
            this.isWatchlisted= true;
          }
        });
      }
    });
  }

  public ToggleToFavorites() {
    // If not favorited, mark as favorite
    if (!this.isFavorite) {
      this.movieCollectionsService.addToFavorites(this.movie).subscribe(
        (res: any) => {
          this.isFavorite = true;
          this.giveUserFeedback(true);
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    } // If already on favorites, remove
    else {
      this.movieCollectionsService.removeFromFavorites(this.movie).subscribe(
        (res: any) => {
          this.isFavorite = false;
          this.giveUserFeedback(true);
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }
  }

  public ToggleToWatchlist() {
    // If not watchlisted, add to watchlist
    if (!this.isWatchlisted) {
      this.movieCollectionsService.addToWatchlist(this.movie).subscribe(
        (res: any) => {
          this.isWatchlisted = true;
          this.giveUserFeedback(true);
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    } // If already watchlisted, remove
    else {
      this.movieCollectionsService.removeFromWatchlist(this.movie).subscribe(
        (res: any) => {
          this.isWatchlisted = false;
          this.giveUserFeedback(true);
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }

  }

  public addToCollection(collection: MovieCollection) {
    this.movieCollectionsService.addMovieToCollection(this.selectedCollection.id, this.movie).subscribe(
      (res: any) => {
        this.giveUserFeedback(true);
      }, (err: any) => {this.giveUserFeedback(false);console.error(err);}
    )
  }

  public applyRating(rating: number) {
    this.ratingsService.addMovieRating(rating, "", this.movie).subscribe(
      (data: any) => {
        this.isRated = true;
        this.fillStarRatings(rating);
        this.giveUserFeedback(true);
      },
      (err: any) => {
        this.giveUserFeedback(false);
        console.error(err)
      }
    )
  }

  public fillStarRatings(rating: number) {
    // unfill all stars
    for (let i = 0; i < 5; i++) {
      this.starRatings[i] = false;
    }

    // fill only necessary stars
    for (let i = 0; i < rating; i++) {
      this.starRatings[i] = true;
    }
  }

  giveUserFeedback(result: boolean) {
    this.success = result;
    this.displayPopup = true;
    setTimeout(() => {
      this.displayPopup = false;
    }, 3000)
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
