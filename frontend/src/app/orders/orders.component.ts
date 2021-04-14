import { Shifts } from './Shifts.enum';
import { Products } from './Products.enum';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderModel } from './order_model';



@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderModel: OrderModel = new OrderModel;
  allOrders?: Observable<OrderModel[]>;
  orderIdUpdate: number = 0;
  message = "";

  title = "List of Orders";
  toggleAdd: boolean = false;
  toggleViewEdit: boolean = false;

  choosen: number = 0;

  public ordersList: OrderModel[] = [];
  orderForm: any;

  products = Object.keys(Products).filter((item) => {
    return isNaN(Number(item));
  });

  shifts = Object.keys(Shifts).filter((item) => {
    return isNaN(Number(item));
  });


  constructor(private formbulider: FormBuilder, private ordersService: OrdersService,
    private modalService: NgbModal, private reactiveForms: ReactiveFormsModule) {
    this.ordersService.getOrdersList().subscribe(data => this.ordersList = data);

  }

  ngOnInit() {
    this.orderForm = this.formbulider.group({
      products: ['', [Validators.required]],
      shifts: ['', [Validators.required]],
      demandQuantity: ['', [Validators.required]],
      supplyQuantity: ['', [Validators.required]],
      orderDate: ['', [Validators.required]],
      expectedDOD: ['', [Validators.required]],
      actualDOD: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
    });
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.allOrders = this.ordersService.getOrdersList();
  }

  isAddClicked() {
    this.toggleAdd = true;
  }

  isViewEditClicked() {
    if (this.choosen != 0) {
      this.toggleViewEdit = true;
      this.orderIdUpdate = this.choosen;
      this.loadCustomerToEdit(this.orderIdUpdate);
    }
    else {
      alert("Please choose a record to Update");
    }
  }

  isDeleteClicked() {
    if (this.choosen != 0) {
      this.orderIdUpdate = this.choosen;
      this.deleteCustomer(this.orderIdUpdate);
    }
    else {
      alert("Please choose a record to Delete");
    }
  }


  saveOrUpdate(customerForm: ReactiveFormsModule) {
    this.orderModel = this.orderForm.value;
    if (this.toggleAdd) {
      this.saveOrder(this.orderModel);
    } else if (this.toggleViewEdit) {
      this.orderIdUpdate = this.choosen;
      this.orderModel.orderId = this.orderIdUpdate;
      this.updateOrder(this.orderModel);
    }
    this.orderForm.reset();
    this.loadAllOrders();
  }

  deleteCustomer(orderId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.ordersService.deleteOrderById(orderId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.loadAllOrders();
        this.orderIdUpdate = 0;
        this.orderForm.reset();
      });
    }
  }

  onCancel() {
    this.toggleAdd = false;
    this.toggleViewEdit = false;
    this.orderForm.reset();
  }

  saveOrder(orderModel: OrderModel) {
    this.ordersService.createOrder(orderModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.loadAllOrders();
        this.orderIdUpdate = 0;
        this.orderForm.reset();
        this.toggleAdd = false;
        this.toggleViewEdit = false;
      }
    );
  }

  updateOrder(orderModel: OrderModel) {
    orderModel.orderId = this.orderIdUpdate;
    this.ordersService.updateOrder(orderModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.loadAllOrders();
      this.orderIdUpdate = 0;
      this.orderForm.reset();
      this.toggleAdd = false;
      this.toggleViewEdit = false;
    });
  }

  loadCustomerToEdit(orderId: number) {
    this.ordersService.getOrderById(orderId).subscribe(order => {
      this.message = "";

      this.orderIdUpdate = order.orderId;
      this.orderForm.controls['products'].setValue(order.products);
      this.orderForm.controls['shifts'].setValue(order.shifts);
      this.orderForm.controls['demandQuantity'].setValue(order.demandQuantity);
      this.orderForm.controls['supplyQuantity'].setValue(order.supplyQuantity);
      this.orderForm.controls['orderDate'].setValue(order.orderDate);
      this.orderForm.controls['expectedDOD'].setValue(order.expectedDOD);
      this.orderForm.controls['actualDOD'].setValue(order.actualDOD);
      this.orderForm.controls['customerId'].setValue(order.customerId);

    });
  }

}


