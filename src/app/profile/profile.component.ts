import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from '../services/movie-collections.service';
import { MoviesService } from '../services/movies.service';
import { MovieRatingsService } from '../services/movie-ratings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
