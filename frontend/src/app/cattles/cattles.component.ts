import { MatSortModule } from '@angular/material/sort';
import { CattleBreed } from './CattleBreed.enum';
import { CattleType } from './CattleType.enum';
import { CattleModel } from './cattle_model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CattlesService } from './cattles.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort'
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



/**
 * @title Table with pagination
 */
@Component({
  selector: 'cattles',
  templateUrl: './cattles.component.html',
  styleUrls: ['./cattles.component.css']
})
export class CattlesComponent implements OnInit {
  cattleModel: CattleModel = new CattleModel;
  allCattles?: Observable<CattleModel[]>;
  cattleIdUpdate: number = 0;
  message = "";

  title = "List of Cattles";
  toggleAdd: boolean = false;
  toggleViewEdit: boolean = false;

  public cattlesList: CattleModel[] = [];
  cattleForm: any;

  cattleType = Object.keys(CattleType).filter((item) => {
    return isNaN(Number(item));
  });

  cattleBreed = Object.keys(CattleBreed).filter((item) => {
    return isNaN(Number(item));
  });

  displayedColumns: string[] = ['cattleId', 'cattleType', 'cattleBreed', 'age', 'milkCapacity', 'lactation', 'deliveryDate', 'calfGendar', 'Actions'];
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
      calfGendar: ['', [Validators.required]],
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

  isAddClicked() {
    this.toggleAdd = true;
  }

  isViewEditClicked(row) {
      this.toggleViewEdit = true;
      this.cattleIdUpdate = row.cattleId;
      this.loadCattleToEdit(this.cattleIdUpdate);
  }

  isDeleteClicked(row) {
      this.cattleIdUpdate = row.cattleId;
      this.deleteCattle(this.cattleIdUpdate);
  }

  saveOrUpdate(cattleForm: ReactiveFormsModule) {
    this.cattleModel = this.cattleForm.value;
    if (this.toggleAdd) {
      this.saveCattle(this.cattleModel);
    } else if (this.toggleViewEdit) {
      this.cattleModel.cattleId = this.cattleIdUpdate;
      this.updateCattle(this.cattleModel);
    }
    this.cattleForm.reset();
    this.refresh();
  }

  deleteCattle(cattleId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.cattlesService.deleteCattleById(cattleId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();;
        this.cattleIdUpdate = 0;
        this.cattleForm.reset();
      });
    }
  }

  onCancel() {
    this.toggleAdd = false;
    this.toggleViewEdit = false;
    this.cattleForm.reset();
    this.refresh();
  }


  saveCattle(cattleModel: CattleModel) {
    this.cattlesService.createCattle(cattleModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.loadAllCattles();
        this.cattleIdUpdate = 0;
        this.cattleForm.reset();
        this.toggleAdd = false;
        this.toggleViewEdit = false;
        this.refresh();
      }
    );
  }

  updateCattle(cattleModel: CattleModel) {
    cattleModel.cattleId = this.cattleIdUpdate;
    this.cattlesService.updateCattle(cattleModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.loadAllCattles();
      this.cattleIdUpdate = 0;
      this.cattleForm.reset();
      this.toggleAdd = false;
      this.toggleViewEdit = false;
      this.refresh();
    });
  }

  loadCattleToEdit(cattleId: number) {
    this.cattlesService.getCattleById(cattleId).subscribe(cattle => {
      this.message = "";

      this.cattleIdUpdate = cattle.cattleId;
      this.cattleForm.controls['cattleType'].setValue(cattle.cattleType);
      this.cattleForm.controls['cattleBreed'].setValue(cattle.cattleBreed);
      this.cattleForm.controls['age'].setValue(cattle.age);
      this.cattleForm.controls['milkCapacity'].setValue(cattle.milkCapacity);
      this.cattleForm.controls['lactation'].setValue(cattle.lactation);
      this.cattleForm.controls['deliveryDate'].setValue(cattle.deliveryDate);
      this.cattleForm.controls['calfGendar'].setValue(cattle.calfGendar);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


