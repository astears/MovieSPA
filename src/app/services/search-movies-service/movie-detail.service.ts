import { Injectable, OnInit } from '../../../../node_modules/@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {
  
  constructor(private httpClient: HttpClient) { }

  getMovieDetails(id: number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=fe154f97538186642f6f894b1181689f&language=en-US`);
  }

}