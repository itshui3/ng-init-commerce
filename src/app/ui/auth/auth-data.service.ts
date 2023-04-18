import { Injectable, Inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../services/api/auth.service';
import { LocalStorage } from '../../types/localStorage';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  private _storageKey = 'jankToken369';

  constructor(
    private _authAPI: AuthService,
    @Inject('LocalStorage') private _localStorage: LocalStorage
  ) {}

  public login() {
    return this._authAPI
      .signInUser()
      .pipe(tap((r) => this._localStorage.setItem(this._storageKey, r.token)));
  }

  public getAuthToken(): string | null {
    return this._localStorage.getItem(this._storageKey);
  }

  public logout(): void {
    this._localStorage.removeItem(this._storageKey);
  }
}
