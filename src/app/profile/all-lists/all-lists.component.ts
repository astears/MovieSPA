import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/models/zMoviesAPI/MovieCollection';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {
  allMovieCollections: MovieCollection[];
  constructor(private movieCollections: MovieCollectionsService, private moviesService: MoviesService) { }

  ngOnInit() {
    this.getUserCollections();
  }

  public getUserCollections() {
    this.movieCollections.getCollectionsByUser().subscribe(
      (collection: MovieCollection[]) => {
        this.allMovieCollections = collection;
        console.log(this.allMovieCollections)
      },
      (error: any) => {
        console.log('error getting movie collections');
      }
    );
  }

  public getMovieBackdrop(movieId: number) : Observable<string> {
    console.log(movieId)
    return this.moviesService.getMovieBackdrop(movieId);
  }

  public onSubmitList(form: NgForm) {
    console.log(form.valid, form.value);
    this.movieCollections.createNewCollection(form.value.title, form.value.description).subscribe(
      (data: any) => {
        console.log(data);
        this.getUserCollections();
      }, (err: any) => {console.error(err);}
    )
  }

}
