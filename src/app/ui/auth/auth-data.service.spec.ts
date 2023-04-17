import { TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';

import { AuthDataService } from './auth-data.service';

describe('AuthDataService', () => {
  let service: AuthDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandler, HttpClient],
    });
    service = TestBed.inject(AuthDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
