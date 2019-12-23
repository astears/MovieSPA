import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  movieToRemove: any;
  showModal = false;
  dropdownIsOpen = false;

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

  removeMovie() {
    console.log(this.movieToRemove);
    this.movieCollectionsService.removeMovieFromCollection(this.collectionId, this.movieToRemove.movieId).subscribe(
      (data: any) => {
        this.getMovies();
      }, (err: any) => {console.log(err);}
    );
  }

}
