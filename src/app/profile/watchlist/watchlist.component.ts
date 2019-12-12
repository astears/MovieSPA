import { Component, OnInit } from '@angular/core';
import { MovieCollection } from 'src/app/Models/MovieCollection';
import { MovieCollectionsService } from 'src/app/services/movie-collections.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  public watchlist: MovieCollection;
  constructor(private movieCollections: MovieCollectionsService) { }

  ngOnInit() {
    this.movieCollections.getCollectionByName("Watchlist").subscribe(
      (collection: MovieCollection) => {
        this.watchlist = collection;
        console.log(this.watchlist)
      },
      (error: any) => {
        console.log('error getting movie collections');
      }
    )
  }

}
