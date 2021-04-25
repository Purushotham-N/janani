import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleDialogComponent } from './cattle-dialog.component';

describe('ViewCattleComponent', () => {
  let component: CattleDialogComponent;
  let fixture: ComponentFixture<CattleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CattleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
