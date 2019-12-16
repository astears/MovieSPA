import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/Models/MovieCollection';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  collectionId: number;
  movies: MovieCollection;

  constructor(private activatedRoute: ActivatedRoute,
              private movieCollectionsService: MovieCollectionsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (data: any) => {
        this.collectionId = data.params['id'];
        this.getMovies();
      }
    )
  }

  public getMovies() {
    this.movieCollectionsService.getCollectionById(this.collectionId).subscribe(
      (movies: MovieCollection) => {
        this.movies = movies;
      }, (err: any) => {console.error(err)}
    );
  }

}
