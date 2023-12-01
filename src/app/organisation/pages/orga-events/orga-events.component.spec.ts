import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaEventsComponent } from './orga-events.component';

describe('OrgaEventsComponent', () => {
  let component: OrgaEventsComponent;
  let fixture: ComponentFixture<OrgaEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgaEventsComponent]
    });
    fixture = TestBed.createComponent(OrgaEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
