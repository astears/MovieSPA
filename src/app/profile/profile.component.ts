import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { MoviesService } from '../services/movies.service';
import { MovieRatingsService } from '../services/movie-ratings.service';
import { MovieCollection } from '../models/zMoviesAPI/MovieCollection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  watchlistId: number;
  favoritesId: number;

  constructor(private movieCollectionsService: MovieCollectionsService) { }

  ngOnInit() {
    this.movieCollectionsService.getCollectionsByUser().subscribe(
      (data: MovieCollection[]) => {
        data.forEach(collection => {
          if (collection.name === 'Favorites') { this.favoritesId = collection.id; }
          else if (collection.name === 'Watchlist') { this.watchlistId = collection.id; }
        })
      }, (err: any) => {console.error(err);}
    );
  }

}
