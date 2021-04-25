import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { MatSort } from '@angular/material/sort';
import { CustomerModel } from './customer_model';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


/**
 * @title Table with filter, sort and pagination
 */
@Component({
  selector: 'customers',
  templateUrl:'./customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements AfterViewInit{
  customerModel: CustomerModel = new CustomerModel;
  allCustomers?: Observable<CustomerModel[]> ;

  message = "";

  title = "List of Customers";

  public customersList: CustomerModel[] = [];
  customerForm: any;

  displayedColumns: string[] = ['customerId', 'firstName', 'lastName', 'mobileNo', 'whatsappNo', 'address', 'Actions'];
  dataSource : MatTableDataSource<CustomerModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.customerForm = this.formbulider.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      whatsappNo: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  constructor(private formbulider: FormBuilder, private customersService: CustomersService,
    private modalService: NgbModal, private reactiveForms:ReactiveFormsModule,
    private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog,) {
    this.customersService.getCustomersList().subscribe(data =>{
      this.customersList = data;
      this.dataSource = new MatTableDataSource<CustomerModel>(this.customersList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
   }

   ngOnInit() {
  }

  refresh() {
    this.customersService.getCustomersList().subscribe(data => {
      this.customersList = data;
      this.dataSource = new MatTableDataSource<CustomerModel>(this.customersList);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.changeDetectorRefs.detectChanges();
    });
  }
  loadAllCustomers() {
    this.allCustomers = this.customersService.getCustomersList();
  }

  add() {
    const data = new CustomerModel();
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCustomer(result);
      }
    });
  }

  edit(data: CustomerModel) {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCustomer(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer(id);
      }
    });
  }

  deleteCustomer(customerId: number) {
      this.customersService.deleteCustomerById(customerId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();
        this.loadAllCustomers();
        this.refresh();;
      });
  }

  saveCustomer(customerModel: CustomerModel){
      this.customersService.createCustomer(customerModel).subscribe(
        () => {
          this.message = 'Record Saved Successfully';
          this.refresh();
        }
      );
  }

  updateCustomer(customerModel: CustomerModel){
      this.customersService.updateCustomer(customerModel).subscribe(() => {
        this.message = 'Record Updated Successfully';
        this.refresh();
      });
  }

  loadCustomerToEdit(customerId: number) {
    this.customersService.getCustomerById(customerId).subscribe(customer=> {
      this.message = "";

      this.customerForm.controls['firstName'].setValue(customer.firstName);
      this.customerForm.controls['lastName'].setValue(customer.lastName);
      this.customerForm.controls['mobileNo'].setValue(customer.mobileNo);
      this.customerForm.controls['whatsappNo'].setValue(customer.whatsappNo);
      this.customerForm.controls['address'].setValue(customer.address);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


