import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductDataService } from 'src/app/ui/product/product-data.service';
import { CartDataService } from '../../cart/cart-data.service';
import { from } from 'rxjs';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: from([{ id: 1 }]) } },
        {
          provide: ProductDataService,
          useValue: {
            getProduct: (id: string) => {
              return {
                id,
                title: 'faketitle',
                price: '50.01',
                description: 'fake description',
                category: 'shoes',
                image: '',
                rather: { rate: 1, count: 1 },
              };
            },
          },
        },
        {
          provide: CartDataService,
          useValue: { addToCart: (id: string, qty: number) => null },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
