import { FodderType } from './../FodderType.enum';
import { FodderInventoryModel } from './../fodder_inventory_model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FodderVariety } from '../FodderVariety.enum';
import { Units } from '../Units.enum';

@Component({
  selector: 'app-fodder-inventory-dialog',
  templateUrl: './fodder-inventory-dialog.component.html',
  styleUrls: ['./fodder-inventory-dialog.component.css']
})
export class FodderInventoryDialogComponent implements OnInit {
  fodInvForm: FormGroup;

  fodderType = Object.keys(FodderType).filter((item) => {
    return isNaN(Number(item));
  });

  fodderVariety = Object.keys(FodderVariety).filter((item) => {
    return isNaN(Number(item));
  });

  units = Object.keys(Units).filter((item) => {
    return isNaN(Number(item));
  });


  constructor(public dialogRef: MatDialogRef<FodderInventoryDialogComponent>,
    private formbulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FodderInventoryModel) {
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

     this.fodInvForm.setValue(data);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new FodderInventoryModel(), this.fodInvForm.value));
  }
}
