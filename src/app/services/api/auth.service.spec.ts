import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign users in and return a token', () => {
    service.signInUser().subscribe((data) => {
      expect(typeof data.token).toBe('string');
    });

    const req = httpTestingController.expectOne(
      `https://fakestoreapi.com/auth/login`
    );

    expect(req.request.method).toEqual('POST');

    req.flush({ token: 'myfaketoken' });
  });
});
