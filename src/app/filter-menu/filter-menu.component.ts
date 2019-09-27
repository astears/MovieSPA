import { Component, OnInit} from '@angular/core';
import { GENRE_PLACEHOLDER, SORT_BY_OPTIONS } from '../constants/StringConstants';
import { MoviesService } from '../services/search-movies-service/movies.service';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {

  genreInfo: any[];
  selectedGenre: string = GENRE_PLACEHOLDER;
  selectedGenreId: string = '-1';
  sortByOptions: {option: string, id: string}[] = SORT_BY_OPTIONS;
  selectedSortBy: string = this.sortByOptions[0].option;
  selectedSortById: string = this.sortByOptions[0].id;
  years: any[] = [];
  selectedYear: number = -1;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getGenres();
    this.initYearsArray();

  }

  initYearsArray() {
    this.years.push("None");
    for (let i = 2019; i >= 1900; i--) {
      this.years.push(i);
    }
  }

  getGenres() {
    this.moviesService.getMovieGenres().subscribe(
      (data: any) => {
        this.genreInfo = data.genres;
      }
    );
  }

  onChangeGenre(event: MouseEvent) {
    this.selectedGenre = (event.srcElement as Element).textContent;
    this.selectedGenreId = (event.srcElement as Element).id;
  }

  onChangeSortBy(event: MouseEvent) {
    this.selectedSortBy = (event.srcElement as Element).textContent;
    this.selectedSortById = (event.srcElement as Element).id;
  }

  onChangeYear(event: MouseEvent) {
    if ((event.srcElement as Element).textContent === 'None') {
      this.selectedYear = -1;
    }
    else {
      this.selectedYear = parseInt((event.srcElement as Element).textContent);
    }
  }

  applyFilters() {
    let pageNumber = 1;

    let filter= {
      year: this.selectedYear,
      genre: this.selectedGenreId,
      sortBy: this.selectedSortById
    }
    this.moviesService.filterMovies(filter);
  }

}
