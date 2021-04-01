import { ICustomer } from './../Icustomer';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'customers',
  templateUrl:'./customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  title = "List of Customers";
  toggleAdd : boolean = false;
  toggleView : boolean = false;
  toggleEdit : boolean = false;
  toggleDelete : boolean = false;
  customerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNo: new FormControl(''),
    whatsappNo:new FormControl(''),
    address: new FormControl('')
  };

  public customersList: ICustomer[] | undefined;

  constructor(private customersService: CustomersService,
    private modalService: NgbModal) {
    this.customersService.getCustomersList().subscribe(data => this.customersList = data);
   }

  ngOnInit():void {}

  isAddClicked(){
    this.toggleAdd = !this.toggleAdd;
    alert("Clicked on Add : "+this.toggleAdd);
  }
  onView(){
    console.log("View button was clicked")
  }
  onUpdate(){
    console.log("Update button was clicked")
  }
  onDelete(){
    console.log("Delete button was clicked")
  }

  saveCustomer(customer: ICustomer){
    this.customersService.saveCustomer(customer);
    alert("saved : "+customer);
}
}
