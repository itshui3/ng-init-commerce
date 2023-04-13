import { Component } from '@angular/core';
import { AuthDataService } from '../../ui/auth/auth-data.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent {
  constructor(private _authService: AuthDataService) {}
  public logout() {
    this._authService.logout();
  }
}
