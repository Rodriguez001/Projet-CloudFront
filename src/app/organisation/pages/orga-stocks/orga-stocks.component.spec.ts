import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaStocksComponent } from './orga-stocks.component';

describe('OrgaStocksComponent', () => {
  let component: OrgaStocksComponent;
  let fixture: ComponentFixture<OrgaStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgaStocksComponent]
    });
    fixture = TestBed.createComponent(OrgaStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
