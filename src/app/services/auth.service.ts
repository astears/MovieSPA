import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Uid;

  constructor() {}

  public getUid() {
    return this.Uid;
  }
}
