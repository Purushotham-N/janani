import { Products } from './../Products.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Shifts } from '../Shifts.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from '../order_model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  orderForm: FormGroup;

  products = Object.keys(Products).filter((item) => {
    return isNaN(Number(item));
  });

  shifts = Object.keys(Shifts).filter((item) => {
    return isNaN(Number(item));
  });




  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
    private formbulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel) {
      this.orderForm = this.formbulider.group({
        orderId: ['', [Validators.required]],
        products: ['', [Validators.required]],
        shifts: ['', [Validators.required]],
        demandQuantity: ['', [Validators.required]],
        supplyQuantity: ['', [Validators.required]],
        orderDate: ['', [Validators.required]],
        expectedDOD: ['', [Validators.required]],
        actualDOD: ['', [Validators.required]],
        customerId: ['', [Validators.required]],
      });

     this.orderForm.setValue(data);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new OrderModel(), this.orderForm.value));
  }

}
