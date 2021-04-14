import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattlesComponent } from './cattles.component';

describe('CattlesComponent', () => {
  let component: CattlesComponent;
  let fixture: ComponentFixture<CattlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CattlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CattlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
