import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfilsComponent } from './gestion-profils.component';

describe('GestionProfilsComponent', () => {
  let component: GestionProfilsComponent;
  let fixture: ComponentFixture<GestionProfilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProfilsComponent]
    });
    fixture = TestBed.createComponent(GestionProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
