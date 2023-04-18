import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthDataService } from './auth-data.service';
import { AuthService } from '../../services/api/auth.service';
import { ResponseToken } from '../../services/api/auth.service';

const mockLocalStorage = {
  storage: {} as { [key: string]: string },
  getItem: (key: string): string | null => {
    return mockLocalStorage.storage[key] || null;
  },
  setItem: (key: string, value: string): void => {
    mockLocalStorage.storage[key] = value;
  },
  removeItem(key: string): void {
    delete mockLocalStorage.storage[key];
  },
  clear(): void {
    mockLocalStorage.storage = {} as { [key: string]: string };
  },
};

const mockTokenResponse: ResponseToken = { token: 'asdf' };

fdescribe('AuthDataService', () => {
  let service: AuthDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthDataService,
        {
          provide: AuthService,
          useValue: {
            // AuthService.signInUser(): Observable<ResponseToken>
            signInUser: () => of(mockTokenResponse),
          },
        },
        {
          provide: 'LocalStorage',
          useValue: mockLocalStorage,
        },
      ],
    });
    service = TestBed.inject(AuthDataService);
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // public login()
  it('should log users in & out', () => {
    service.login().subscribe((_) => {
      expect(service.getAuthToken()).toEqual(mockTokenResponse.token);
      service.logout();
      expect(service.getAuthToken()).toBeFalsy();
    });
  });
});
