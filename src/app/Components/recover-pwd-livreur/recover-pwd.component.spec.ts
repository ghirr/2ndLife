import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPWDComponent } from './recover-pwd.component';

describe('RecoverPWDComponent', () => {
  let component: RecoverPWDComponent;
  let fixture: ComponentFixture<RecoverPWDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverPWDComponent]
    });
    fixture = TestBed.createComponent(RecoverPWDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
