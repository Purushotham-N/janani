import { MatSort } from '@angular/material/sort';
import { FodderVariety } from './FodderVariety.enum';
import { Component, OnInit } from '@angular/core';

import { FodderInventoryModel } from './fodder_inventory_model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FodderInventoryService } from './fodder-inventory.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FodderType } from './FodderType.enum';
import { Units } from './Units.enum';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FodderInventoryDialogComponent } from './fodder-inventory-dialog/fodder-inventory-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-fodder-inventory',
  templateUrl: './fodder-inventory.component.html',
  styleUrls: ['./fodder-inventory.component.css']
})

export class FodderInventoryComponent implements OnInit {

  fodderInventoryModel: FodderInventoryModel = new FodderInventoryModel;
  allFodderInventories?: Observable<FodderInventoryModel[]>;

  message = "";

  title = "Fodder Inventories";


  public fodderInventoryList: FodderInventoryModel[] = [];
  fodInvForm: any;



  displayedColumns: string[] = ['fodderInventoryId', 'fodderType', 'fodderVariety', 'units', 'quantityPerUnit', 'totalQuantity', 'pricePerUnit', 'deliveryCharges', 'transportationCharges', 'labourCharges', 'purchasedDate', 'totalCostPerPurchase', 'Actions'];
  dataSource : MatTableDataSource<FodderInventoryModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private fodderInventoryService: FodderInventoryService,
    private modalService: NgbModal, private reactiveForms: ReactiveFormsModule,
    private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog,) {
    this.fodderInventoryService.getAllFodderInventoriesList().subscribe(data =>{
      this.fodderInventoryList = data;
      this.dataSource = new MatTableDataSource<FodderInventoryModel>(this.fodderInventoryList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.fodInvForm = this.formbulider.group({
      fodderInventoryId: ['', [Validators.required]],
      fodderType: ['', [Validators.required]],
      fodderVariety: ['', [Validators.required]],
      units: ['', [Validators.required]],
      quantityPerUnit: ['', [Validators.required]],
      totalQuantity: ['', [Validators.required]],
      pricePerUnit: ['', [Validators.required]],
      deliveryCharges: ['', [Validators.required]],
      transportationCharges: ['', [Validators.required]],
      labourCharges: ['', [Validators.required]],
      purchasedDate: ['', [Validators.required]],
      totalCostPerPurchase: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  refresh() {
    this.fodderInventoryService.getAllFodderInventoriesList().subscribe(data => {
      this.fodderInventoryList = data;
      this.dataSource = new MatTableDataSource<FodderInventoryModel>(this.fodderInventoryList);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.changeDetectorRefs.detectChanges();
    });
  }

  loadAllFodderInventories() {
    this.allFodderInventories = this.fodderInventoryService.getAllFodderInventoriesList();
  }

  add() {
    const data = new FodderInventoryModel();
    const dialogRef = this.dialog.open(FodderInventoryDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveFodderInventory(result);
      }
    });
  }

  edit(data: FodderInventoryModel) {
    const dialogRef = this.dialog.open(FodderInventoryDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateFodderInventory(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFodderInventory(id);
      }
    });
  }

  deleteFodderInventory(fodderInventoryId: Number) {
      this.fodderInventoryService.deleteFodderInventory(fodderInventoryId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();
      });
  }

  saveFodderInventory(fodderInventoryModel: FodderInventoryModel) {
    this.fodderInventoryService.createFodderInventory(fodderInventoryModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.refresh();
      }
    );
  }

  updateFodderInventory(fodderInventoryModel: FodderInventoryModel) {
    this.fodderInventoryService.updateFodderInventory(fodderInventoryModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.refresh();
    });
  }

  // loadFodderInventoryToEdit(fodderInventoryId: Number) {
  //   this.fodderInventoryService.getFodderInventoryById(fodderInventoryId).subscribe(fodderInv => {
  //     this.message = "";

  //     this.fodInvForm.controls['fodderType'].setValue(fodderInv.fodderType);
  //     this.fodInvForm.controls['fodderVariety'].setValue(fodderInv.fodderVariety);
  //     this.fodInvForm.controls['units'].setValue(fodderInv.units);
  //     this.fodInvForm.controls['quantityPerUnit'].setValue(fodderInv.quantityPerUnit);
  //     this.fodInvForm.controls['totalQuantity'].setValue(fodderInv.totalQuantity);
  //     this.fodInvForm.controls['pricePerUnit'].setValue(fodderInv.pricePerUnit);
  //     this.fodInvForm.controls['deliveryCharges'].setValue(fodderInv.deliveryCharges);
  //     this.fodInvForm.controls['transportationCharges'].setValue(fodderInv.transportationCharges);
  //     this.fodInvForm.controls['labourCharges'].setValue(fodderInv.labourCharges);
  //     this.fodInvForm.controls['purchasedDate'].setValue(fodderInv.purchasedDate);
  //     this.fodInvForm.controls['totalCostPerPurchase'].setValue(fodderInv.totalCostPerPurchase);

  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


