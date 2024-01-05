import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashLivComponent } from './dash-liv.component';

describe('DashLivComponent', () => {
  let component: DashLivComponent;
  let fixture: ComponentFixture<DashLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashLivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
