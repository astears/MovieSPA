import { Component, OnInit } from '@angular/core';
import { MovieRatingsService } from 'src/app/services/movie-ratings.service';
import { Rating } from 'src/app/models/zMoviesAPI/Rating';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  ratings: Rating[] = [];
  constructor(private ratingsService: MovieRatingsService) { }

  ngOnInit() {
    this.getUserRatings();
  }

  public getUserRatings() {
    this.ratingsService.getRatingsByUserId().subscribe(
      (data: Rating[]) => {
        console.log(data);
        this.ratings = data;
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
