import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { MovieLists } from '../../enums/MovieListEnums';
import { PageService } from './page.service';
import { IMovieResults } from 'src/app/Models/IMovieResults';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public movies = new Subject <IMovieResults>();
  private activeCategory = "";

  constructor(private httpClient: HttpClient, private pageService: PageService) {}

  public searchMovieByKeyword(query: string) {
    return this.httpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=fe154f97538186642f6f894b1181689f&language=en-US&query=${query}&page=2&include_adult=false`);
  }

  public getMovieGenres() {
    return this.httpClient.get('https://api.themoviedb.org/3/genre/movie/list?api_key=fe154f97538186642f6f894b1181689f&language=en-US');
  }

  public filterMovies(filter: any) {
    let year = filter.year;
    let genre = filter.genre;
    let sortBy = filter.sortBy;

    let query = `https://api.themoviedb.org/3/discover/movie?api_key=fe154f97538186642f6f894b1181689f&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${this.pageService.selectedPage}`;
    if (genre !== '-1') {
      query += `&with_genres=${genre}`;
    }
    if (year !== -1) {
        query += `&year=${year}`;
    }
    let movies = {
      results: {},
      total_pages: 0,
      category: this.activeCategory
    };

    this.httpClient.get(query).subscribe(
      (data: any) => {
        movies.results = data.results;
        movies.total_pages = data.total_pages;
        this.movies.next(movies);
      });
  }

  changeCategory(category: string) {
    this.getMoviesByCategory(category, 1);
  }

  getMoviesByCategory(category: string, pageNumber: number) {

    let httpObsv: Observable<Object>;
    this.activeCategory = category;

    switch(category) {
      case MovieLists.TopRatedMovies: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
      case MovieLists.PopularMovies: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
      case MovieLists.UpcomingMovies: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
      case MovieLists.NowPlayingMovies: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
      case MovieLists.DiscoverMovies: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
      default: {
        httpObsv = this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=fe154f97538186642f6f894b1181689f&language=en-US&page=${pageNumber}`);
        break;
      }
    }

    let movies = {
      results: {},
      total_pages: 0,
      category: category
    };

    httpObsv.subscribe(
      (data: any) => {
        movies.results = data.results;
        movies.total_pages = data.total_pages;
        return this.movies.next(movies);
      });
  }

}
