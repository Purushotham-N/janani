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


/**
 * @title Table with pagination
 */
@Component({
  selector: 'customers',
  templateUrl:'./customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements AfterViewInit{
  customerModel: CustomerModel = new CustomerModel;
  allCustomers?: Observable<CustomerModel[]> ;
  customerIdUpdate: number = 0;
  message = "";

  title = "List of Customers";
  toggleAdd : boolean = false;
  toggleViewEdit : boolean = false;

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

  isAddClicked(){
    this.toggleAdd = true;
  }

  isViewEditClicked(row){
      this.toggleViewEdit = true;
      this.customerIdUpdate = row.customerId;
      this.loadCustomerToEdit(this.customerIdUpdate);
  }

  isDeleteClicked(row){
    this.customerIdUpdate = row.customerId;
      this.deleteCustomer(this.customerIdUpdate);
  }


  saveOrUpdate(customerForm:ReactiveFormsModule) {
    this.customerModel = this.customerForm.value;
    if (this.toggleAdd) {
      this.saveCustomer(this.customerModel);
    }else if(this.toggleViewEdit){
      this.customerModel.customerId = this.customerIdUpdate;
      this.updateCustomer(this.customerModel);
    }
    this.customerForm.reset();
    this.refresh();
  }

  deleteCustomer(customerId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.customersService.deleteCustomerById(customerId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();
        this.customerIdUpdate = 0;
        this.customerForm.reset();
      });
    }
  }

  onCancel() {
    this.toggleAdd = false;
    this.toggleViewEdit = false;
    this.customerForm.reset();
  }

  saveCustomer(customerModel: CustomerModel){
      this.customersService.createCustomer(customerModel).subscribe(
        () => {
          this.message = 'Record Saved Successfully';
          this.refresh();
          this.customerIdUpdate = 0;
          this.customerForm.reset();
          this.toggleAdd = false;
          this.toggleViewEdit = false;
        }
      );
  }

  updateCustomer(customerModel: CustomerModel){
      customerModel.customerId =  this.customerIdUpdate;
      this.customersService.updateCustomer(customerModel).subscribe(() => {
        this.message = 'Record Updated Successfully';
        this.refresh();
        this.customerIdUpdate = 0;
        this.customerForm.reset();
        this.toggleAdd = false;
        this.toggleViewEdit = false;
      });
  }

  loadCustomerToEdit(customerId: number) {
    this.customersService.getCustomerById(customerId).subscribe(customer=> {
      this.message = "";

      this.customerIdUpdate = customer.customerId;
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


