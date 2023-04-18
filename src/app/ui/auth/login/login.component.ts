import { Component } from '@angular/core';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _authService: AuthDataService) {}

  public signIn() {
    this._authService.login().subscribe();
  }
}
