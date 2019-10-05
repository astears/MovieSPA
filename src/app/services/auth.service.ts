import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Uid = 1;

  constructor() {}

  public getUid() {
    return this.Uid;
  }
}
