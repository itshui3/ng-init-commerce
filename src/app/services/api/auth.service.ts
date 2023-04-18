import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ResponseToken {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _signInURL = `https://fakestoreapi.com/auth/login`;

  constructor(private http: HttpClient) {}

  public signInUser(): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(this._signInURL, {
      username: 'johnd',
      password: 'm38rmF$',
    });
  }
}
