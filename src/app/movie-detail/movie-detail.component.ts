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
  backgroundStyle: any = {};
  isFavorite = false;
  isRated = false;
  isWatchlisted = false;
  success = false;
  displayPopup = false;
  showRatings = false;
  starRatings = [false, false, false, false, false];

  constructor(private routes: ActivatedRoute,
              private moviesService: MoviesService,
              private movieCollections: MovieCollectionsService,
              private ratingsService: MovieRatingsService){ }

  ngOnInit() {
    this.movieId = this.routes.snapshot.params['id'];

    this.moviesService.getMovieDetails(this.movieId).subscribe(
      (movieInfo: Movie) => {
        this.movie = movieInfo;
        console.log(this.movie)
        this.setBackgroundStyle();
      }
    );

    this.getMovieGlyphiconDetails();
  }

  public getMovieGlyphiconDetails() {
    this.movieCollections.getCollectionByName('Favorites').subscribe(
      (favorites: MovieCollection) => {
        console.log(favorites)
        if (favorites !== null) {
          favorites.movieToMovieCollections.forEach(mmc => {
            if (mmc.movie.movieDbId === this.movie.id) {
              this.isFavorite = true;
            }
          });
        }
      }
    );

    this.movieCollections.getCollectionByName('Watchlist').subscribe(
      (watchlist: MovieCollection) => {
        if (watchlist !== null) {
          watchlist.movieToMovieCollections.forEach(mmc => {
            if (mmc.movie.movieDbId === this.movie.id) {
              this.isWatchlisted = true;
            }
          });
        }
      }
    );

    this.ratingsService.getRatingsByUserId().subscribe(
      (ratings: any) => {
        ratings.movieRatingsByUser.forEach(rating => {
          if (rating.movie.movieDbId === this.movie.id) {
            this.isRated = true;
            this.fillStarRatings(rating.rating.value);
            console.log(rating.rating.value)
          }
        });
      }, (err: any) => {}
    )
  }

  public ToggleToFavorites() {
    //console.log(this.isFavorite)
    if (!this.isFavorite) {
      this.movieCollections.addToFavorites(this.movie).subscribe(
        (res: any) => {
          this.isFavorite = true;
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }
    else {
      this.movieCollections.removeFromFavorites(this.movie).subscribe(
        (res: any) => {
          this.isFavorite = false;
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }
  }

  public ToggleToWatchlist() {
    if (!this.isWatchlisted) {
      this.movieCollections.addToWatchlist(this.movie).subscribe(
        (res: any) => {
          this.isWatchlisted = true;
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }
    else {
      this.movieCollections.removeFromWatchlist(this.movie).subscribe(
        (res: any) => {
          this.isWatchlisted = false;
      },
        (error: any) => {
          this.giveUserFeedback(false);
      });
    }

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

  giveUserFeedback(result: boolean) {
    this.success = result;
    this.displayPopup = true;
    setTimeout(() => {
      this.displayPopup = false;
    }, 3000)
  }

  public applyRating(rating: number) {
    console.log(rating, this.movie);
    this.ratingsService.addMovieRating(rating, "", this.movie).subscribe(
      (data: any) => {
        this.fillStarRatings(rating);
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

  public closeRatings() {
    this.showRatings = false;
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
