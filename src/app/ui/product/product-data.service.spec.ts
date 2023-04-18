import { TestBed } from '@angular/core/testing';
import {
  ProductAPIService,
  ProductList,
} from '../../services/api/productAPI.service';

import { ProductDataService, ProductMap } from './product-data.service';
import { of } from 'rxjs';

const mockProduct = {
  id: 1,
  title: 'title',
  price: 5.55,
  description: 'description',
  category: 'category',
  image: '',
  rather: { rate: 5, count: 5 },
};
const mockProductList: ProductList = [mockProduct];
const mockProductMap: ProductMap = { '1': mockProduct };

describe('ProductDataService', () => {
  let service: ProductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductAPIService,
          useValue: {
            fetchSomeProducts: () => of(mockProductList),
            fetchProduct: (id: string) =>
              of({ ...mockProductList[0], id: +id }),
          },
        },
      ],
    });
    service = TestBed.inject(ProductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // public getAllProducts(): Observable<ProductList>
  it('should fetch & subscribe products in an array', () => {
    service.getAllProducts().subscribe((productList) => {
      for (let i = 0; i < productList.length; i++) {
        expect(productList[i]).toEqual(mockProductList[i]);
      }
    });
  });

  // public getProductMap(): Observable<ProductMap>
  it('should fetch & subscribe indexed products', () => {
    service.getProductMap().subscribe((productMap) => {
      Object.keys(productMap).forEach((id) => {
        expect(productMap[id]).toEqual(mockProductMap[id]);
      });
    });
  });

  // public getProduct(id: string): Observable<Product>
  it('should fetch a product', () => {
    service.getProduct('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });
  });
});
