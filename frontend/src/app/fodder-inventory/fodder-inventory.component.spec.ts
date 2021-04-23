import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FodderInventoryComponent } from './fodder-inventory.component';

describe('FodderInventoryComponent', () => {
  let component: FodderInventoryComponent;
  let fixture: ComponentFixture<FodderInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FodderInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FodderInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
