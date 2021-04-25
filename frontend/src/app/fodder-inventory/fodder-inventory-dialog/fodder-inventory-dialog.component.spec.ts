import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FodderInventoryDialogComponent } from './fodder-inventory-dialog.component';

describe('FodderInventoryDialogComponent', () => {
  let component: FodderInventoryDialogComponent;
  let fixture: ComponentFixture<FodderInventoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FodderInventoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FodderInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
