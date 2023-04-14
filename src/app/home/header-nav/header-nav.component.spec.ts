import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDataService } from '../../ui/auth/auth-data.service';
import { HeaderNavComponent } from './header-nav.component';

fdescribe('HeaderNavComponent', () => {
  let component: HeaderNavComponent;
  let fixture: ComponentFixture<HeaderNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderNavComponent],
      providers: [
        { provide: AuthDataService, useValue: { logout: () => null } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
