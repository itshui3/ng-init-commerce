import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDataService, CartWithProducts } from './cart-data.service';

import { CartComponent } from './cart.component';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {
          provide: CartDataService,
          useValue: {
            modifyItemQty: (id: number, newQty: number) => null,
            deleteCartItem: (id: number) => null,
            initCart: () => null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
