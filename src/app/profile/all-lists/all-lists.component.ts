import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/Models/MovieCollection';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {
  movieLists: MovieCollection[];
  constructor(private movieCollections: MovieCollectionsService) { }

  ngOnInit() {
    this.movieCollections.getCollectionsByUser().subscribe(
      (collection: MovieCollection[]) => {
        this.movieLists = collection;
        console.log(this.movieLists)
      },
      (error: any) => {
        console.log('error getting movie collections');
      }
    )
  }

}
