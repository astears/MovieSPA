import { Component, OnInit } from '@angular/core';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';
import { MovieCollection } from 'src/app/Models/MovieCollection';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public favorites: MovieCollection;
  constructor(private movieCollections: MovieCollectionsService) { }

  ngOnInit() {
    this.movieCollections.getCollectionByName("Favorites").subscribe(
      (collection: MovieCollection) => {
        this.favorites = collection;
        console.log(this.favorites)
      },
      (error: any) => {
        console.log('error getting movie collections');
      }
    )
  }

}
