import { Component, OnInit } from '@angular/core';
import { MovieRatingsService } from 'src/app/services/movie-ratings.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  movies: any[] = [];
  constructor(private ratingsService: MovieRatingsService) { }

  ngOnInit() {
    this.getUserRatings();
  }

  public getUserRatings() {
    this.ratingsService.getRatingsByUserId().subscribe(
      (data: any) => {
        console.log(data.movieRatingsByUser);
        this.movies = [];
        data.movieRatingsByUser.forEach(rating => {
          this.movies.push(rating);
        });
      }, (err: any) => {console.error(err);}
    );
  }

  public deleteRating(movieId: number) {
    this.ratingsService.deleteMovieRating(movieId).subscribe(
      (data: any) => {
        console.log(data);
        this.getUserRatings();
      }, (err: any) => {console.error(err);}
    );
  }

}
