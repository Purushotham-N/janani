import { CustomerModel } from './../customer_model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  customerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>,
    private formbulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CustomerModel) {
      this.customerForm = this.formbulider.group({
        customerId: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        mobileNo: ['', [Validators.required]],
        whatsappNo: ['', [Validators.required]],
        address: ['', [Validators.required]],
      });

     this.customerForm.setValue(data);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new CustomerModel(), this.customerForm.value));
  }

}
