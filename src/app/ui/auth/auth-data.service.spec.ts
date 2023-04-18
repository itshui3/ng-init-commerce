import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';

import { AuthDataService } from './auth-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthDataService', () => {
  let service: AuthDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthDataService],
    });
    service = TestBed.inject(AuthDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // public login()
  it('should log users in', () => {
    const signInResp = {
      token: 'faketoken',
    };
    service.login().subscribe((_) => {
      expect(typeof service.getAuthToken()).toBe('string');
    });
    // const req = httpTestingController.expectOne()
  });

  // public getAuthToken()

  // public logout(): void
});
