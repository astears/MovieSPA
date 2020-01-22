import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/models/zMoviesAPI/MovieCollection';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {
  allMovieCollections: MovieCollection[];
  constructor(private movieCollections: MovieCollectionsService) { }

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
