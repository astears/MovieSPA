import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieCollectionsService {
  private baseApiURL = 'http://localhost:5000/api/moviecollections/';

  constructor(private httpClient: HttpClient, authService: AuthService) {}

  public createNewCollection(name: string, desc: string) {

    //this.httpClient.post()
  }
}
