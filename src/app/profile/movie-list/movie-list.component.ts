import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/models/zMoviesAPI/MovieCollection';
import { NgForm } from '@angular/forms';
import { Movie } from 'src/app/models/zMoviesAPI/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  collectionId: number;
  collection: MovieCollection;
  movieToRemove: Movie;
  showModal = false;
  dropdownIsOpen = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
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
        this.collection = movies;
        console.log(this.collection);
      }, (err: any) => {console.error(err)}
    );
  }

  public removeMovie() {
    console.log(this.movieToRemove);
    this.movieCollectionsService.removeMovieFromCollection(this.collectionId, this.movieToRemove.movieId).subscribe(
      (data: any) => {
        this.getMovies();
      }, (err: any) => {console.log(err);}
    );
  }

  public onEditList(form: NgForm) {
    console.log(form);
     this.movieCollectionsService.editCollectionInfo(this.collectionId, form.value.title, form.value.description).subscribe(
      (data: any) => {
        console.log(data);
        this.getMovies();
      }, (err: any) => {console.error(err);}
     );
  }

  public deleteList() {
    this.movieCollectionsService.deleteCollection(this.collection.id).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl('profile/all-lists').then(
          (res: boolean) => {
            console.log("Successfully naviagted.");
          }, (err: any) => {console.error(err);}
        )

      }, (err: any) => {console.error(err);}
    )
  }

}
