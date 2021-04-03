import { CustomerModel } from './../customer_model';
import { Component, Input, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'customers',
  templateUrl:'./customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  dataSaved = false;  
  customerModel: CustomerModel = new CustomerModel;  
  allCustomers?: Observable<CustomerModel[]> ;  
  customerIdUpdate: number = 0;  
  massage = "";  

  title = "List of Customers";
  toggleAdd : boolean = false;
  toggleView : boolean = false;
  toggleEdit : boolean = false;
  toggleDelete : boolean = false;
  
  


  public customersList: CustomerModel[] = [];
  customerForm: any;
//   customerForm = new FormGroup({
//     firstName:  new FormControl(''),
// }); 
  

  constructor(private formbulider: FormBuilder, private customersService: CustomersService,
    private modalService: NgbModal) {
    this.customersService.getCustomersList().subscribe(data => this.customersList = data);
   }

   ngOnInit() {  
    this.customerForm = this.formbulider.group({  
      firstName: ['', [Validators.required]],
    });  
    this.loadAllCustomers();  
  }  

  loadAllCustomers() {  
    this.allCustomers = this.customersService.getCustomersList();  
  }  


  isAddClicked(){
    this.toggleAdd = !this.toggleAdd;
  }


  onSubmit() {  
    this.dataSaved = false;  
    const customerModel = this.customerForm.value; 
    console.log("first name::"+this.customerForm.get('firstName')?.value)
    this.CreateCustomer(customerModel);  
    this.customerForm.reset();  
  } 

  CreateCustomer(customer: CustomerModel){
    if (this.customerIdUpdate == 0) {  
      this.customersService.createCustomer(customer).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllCustomers();  
          this.customerIdUpdate = 0;  
          this.customerForm.reset();  
        }  
      );  
    } else {  
      customer.customerId = this.customerIdUpdate;  
      this.customersService.updateCustomer(customer).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllCustomers();  
        this.customerIdUpdate = 0;  
        this.customerForm.reset();  
      });  
    } 
  }

}
