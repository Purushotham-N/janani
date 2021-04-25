import { CattleModel } from './cattle_model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CattlesService } from './cattles.service';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort'
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CattleDialogComponent } from './cattle-dialog/cattle-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';




/**
 * @title Table with filter, sort and pagination
 */
@Component({
  selector: 'cattles',
  templateUrl: './cattles.component.html',
  styleUrls: ['./cattles.component.css']
})
export class CattlesComponent implements OnInit {
  cattleModel: CattleModel = new CattleModel;
  allCattles?: Observable<CattleModel[]>;
  message = "";

  title = "List of Cattles";
  cattleForm: FormGroup;

  public cattlesList: CattleModel[] = [];

  displayedColumns: string[] = ['cattleId', 'cattleType', 'cattleBreed', 'age', 'milkCapacity', 'lactation', 'deliveryDate', 'sex', 'Actions'];
  dataSource : MatTableDataSource<CattleModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private cattlesService: CattlesService,
    private modalService: NgbModal, private reactiveForms: ReactiveFormsModule,
    private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog,) {
    this.cattlesService.getCattlesList().subscribe(data => {
      this.cattlesList = data;
      this.dataSource = new MatTableDataSource<CattleModel>(this.cattlesList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.cattleForm = this.formbulider.group({
      cattleId: ['', [Validators.required]],
      cattleType: ['', [Validators.required]],
      cattleBreed: ['', [Validators.required]],
      age: ['', [Validators.required]],
      milkCapacity: ['', [Validators.required]],
      lactation: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      sex: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  refresh() {
    this.cattlesService.getCattlesList().subscribe(data => {
      this.cattlesList = data;
      this.dataSource = new MatTableDataSource<CattleModel>(this.cattlesList);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.changeDetectorRefs.detectChanges();
    });

  }

  loadAllCattles() {
    this.allCattles = this.cattlesService.getCattlesList();
  }

  add() {
    const data = new CattleModel();
    const dialogRef = this.dialog.open(CattleDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCattle(result);
      }
    });
  }

  edit(data: CattleModel) {
    const dialogRef = this.dialog.open(CattleDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCattle(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCattle(id);
      }
    });
  }

  deleteCattle(cattleId: number) {

      this.cattlesService.deleteCattleById(cattleId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();
      });
  }


  saveCattle(cattleModel: CattleModel) {
    this.cattlesService.createCattle(cattleModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.refresh();
      }
    );
  }

  updateCattle(cattleModel: CattleModel) {
      this.cattlesService.updateCattle(cattleModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.refresh();
    });
  }

  loadCattleToEdit(cattleId: number) {
    this.cattlesService.getCattleById(cattleId).subscribe(cattle => {
      this.message = "";
      this.cattleForm.controls['cattleType'].setValue(cattle.cattleType);
      this.cattleForm.controls['cattleBreed'].setValue(cattle.cattleBreed);
      this.cattleForm.controls['age'].setValue(cattle.age);
      this.cattleForm.controls['milkCapacity'].setValue(cattle.milkCapacity);
      this.cattleForm.controls['lactation'].setValue(cattle.lactation);
      this.cattleForm.controls['deliveryDate'].setValue(cattle.deliveryDate);
      this.cattleForm.controls['sex'].setValue(cattle.sex);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


