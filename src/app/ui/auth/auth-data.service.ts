import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../services/api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  private _storageKey = 'jankToken369';

  constructor(private _authAPI: AuthService) {}

  public login() {
    if (localStorage.getItem(this._storageKey)) {
      return;
    }
    this._authAPI
      .signInUser()
      .pipe(tap((r) => localStorage.setItem(this._storageKey, r.token)))
      .subscribe();
  }

  public getAuthToken() {
    return localStorage.getItem(this._storageKey);
  }
}
