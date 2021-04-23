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
  fodderInventoryIdUpdate: Number = 0;
  message = "";

  title = "Fodder Inventories";
  toggleAdd: boolean = false;
  toggleViewEdit: boolean = false;

  choosen: number = 0;

  public fodderInventoryList: FodderInventoryModel[] = [];
  fodInvForm: any;

  fodderType = Object.keys(FodderType).filter((item) => {
    return isNaN(Number(item));
  });

  fodderVariety = Object.keys(FodderVariety).filter((item) => {
    return isNaN(Number(item));
  });

  units = Object.keys(Units).filter((item) => {
    return isNaN(Number(item));
  });

  displayedColumns: string[] = ['select', 'fodderInventoryId', 'fodderType', 'fodderVariety', 'units', 'quantityPerUnit', 'totalQuantity', 'pricePerUnit', 'deliveryCharges', 'transportationCharges', 'labourCharges', 'purchasedDate', 'totalCostPerPurchase', 'Actions'];
  dataSource : MatTableDataSource<FodderInventoryModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private fodderInventoryService: FodderInventoryService,
    private modalService: NgbModal, private reactiveForms: ReactiveFormsModule) {
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

  loadAllFodderInventories() {
    this.allFodderInventories = this.fodderInventoryService.getAllFodderInventoriesList();
  }

  isAddClicked() {
    this.toggleAdd = true;
  }

  isViewEditClicked() {
    if (this.choosen != 0) {
      this.toggleViewEdit = true;
      this.fodderInventoryIdUpdate = this.choosen;
      this.loadFodderInventoryToEdit(this.fodderInventoryIdUpdate);
    }
    else {
      alert("Please choose a record to Update");
    }
  }

  isDeleteClicked() {
    if (this.choosen != 0) {
      this.fodderInventoryIdUpdate = this.choosen;
      this.deleteFodderInventory(this.fodderInventoryIdUpdate);
    }
    else {
      alert("Please choose a record to Delete");
    }
  }


  saveOrUpdate(fodInvForm: ReactiveFormsModule) {
    this.fodderInventoryModel = this.fodInvForm.value;
    if (this.toggleAdd) {
      this.saveFodderInventory(this.fodderInventoryModel);
    } else if (this.toggleViewEdit) {
      this.fodderInventoryIdUpdate = this.choosen;
      this.fodderInventoryModel.fodderInventoryId = this.fodderInventoryIdUpdate;
      this.updateFodderInventory(this.fodderInventoryModel);
    }
    this.fodInvForm.reset();
    this.loadAllFodderInventories();
  }

  deleteFodderInventory(fodderInventoryId: Number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.fodderInventoryService.deleteFodderInventory(fodderInventoryId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.loadAllFodderInventories();
        this.fodderInventoryIdUpdate = 0;
        this.fodInvForm.reset();
      });
    }
  }

  onCancel() {
    this.toggleAdd = false;
    this.toggleViewEdit = false;
    this.fodInvForm.reset();
  }

  saveFodderInventory(fodderInventoryModel: FodderInventoryModel) {
    this.fodderInventoryService.createFodderInventory(fodderInventoryModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.loadAllFodderInventories();
        this.fodderInventoryIdUpdate = 0;
        this.fodInvForm.reset();
        this.toggleAdd = false;
        this.toggleViewEdit = false;
      }
    );
  }

  updateFodderInventory(fodderInventoryModel: FodderInventoryModel) {
    fodderInventoryModel.fodderInventoryId = this.fodderInventoryIdUpdate;
    this.fodderInventoryService.updateFodderInventory(fodderInventoryModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.loadAllFodderInventories();
      this.fodderInventoryIdUpdate = 0;
      this.fodInvForm.reset();
      this.toggleAdd = false;
      this.toggleViewEdit = false;
    });
  }

  loadFodderInventoryToEdit(fodderInventoryId: Number) {
    this.fodderInventoryService.getFodderInventoryById(fodderInventoryId).subscribe(fodderInv => {
      this.message = "";

      this.fodderInventoryIdUpdate = fodderInv.fodderInventoryId;
      this.fodInvForm.controls['fodderType'].setValue(fodderInv.fodderType);
      this.fodInvForm.controls['fodderVariety'].setValue(fodderInv.fodderVariety);
      this.fodInvForm.controls['units'].setValue(fodderInv.units);
      this.fodInvForm.controls['quantityPerUnit'].setValue(fodderInv.quantityPerUnit);
      this.fodInvForm.controls['totalQuantity'].setValue(fodderInv.totalQuantity);
      this.fodInvForm.controls['pricePerUnit'].setValue(fodderInv.pricePerUnit);
      this.fodInvForm.controls['deliveryCharges'].setValue(fodderInv.deliveryCharges);
      this.fodInvForm.controls['transportationCharges'].setValue(fodderInv.transportationCharges);
      this.fodInvForm.controls['labourCharges'].setValue(fodderInv.labourCharges);
      this.fodInvForm.controls['purchasedDate'].setValue(fodderInv.purchasedDate);
      this.fodInvForm.controls['totalCostPerPurchase'].setValue(fodderInv.totalCostPerPurchase);

    });
  }

}


