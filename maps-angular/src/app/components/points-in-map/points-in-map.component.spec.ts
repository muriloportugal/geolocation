import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsInMapComponent } from './points-in-map.component';

describe('PointsInMapComponent', () => {
  let component: PointsInMapComponent;
  let fixture: ComponentFixture<PointsInMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsInMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsInMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
