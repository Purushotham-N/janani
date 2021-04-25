import { MatSort } from '@angular/material/sort';
import { Shifts } from './Shifts.enum';
import { Products } from './Products.enum';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderModel } from './order_model';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';


/**
 * @title Table with pagination
 */
@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderModel: OrderModel = new OrderModel;
  allOrders?: Observable<OrderModel[]>;
  message = "";

  title = "List of Orders";

  public ordersList: OrderModel[] = [];
  orderForm: any;

  displayedColumns: string[] = ['orderId', 'products', 'shifts', 'demandQuantity', 'supplyQuantity', 'actualDOD', 'customerId', 'Actions'];
  dataSource : MatTableDataSource<OrderModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private formbulider: FormBuilder, private ordersService: OrdersService,
    private modalService: NgbModal, private reactiveForms: ReactiveFormsModule,
    private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog,) {
    this.ordersService.getOrdersList().subscribe(data => {
      this.ordersList = data
      this.dataSource = new MatTableDataSource<OrderModel>(this.ordersList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  ngAfterViewInit() {
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
  }


  ngOnInit() {

  }

  refresh() {
    this.ordersService.getOrdersList().subscribe(data => {
      this.ordersList = data;
      this.dataSource = new MatTableDataSource<OrderModel>(this.ordersList);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.changeDetectorRefs.detectChanges();
    });
  }

  loadAllOrders() {
    this.allOrders = this.ordersService.getOrdersList();
  }

  add() {
    const data = new OrderModel();
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveOrder(result);
      }
    });
  }

  edit(data: OrderModel) {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateOrder(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOrder(id);
      }
    });
  }


  deleteOrder(orderId: number) {
      this.ordersService.deleteOrderById(orderId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.refresh();
      });
    }

  saveOrder(orderModel: OrderModel) {
    this.ordersService.createOrder(orderModel).subscribe(
      () => {
        this.message = 'Record Saved Successfully';
        this.refresh();
      }
    );
  }

  updateOrder(orderModel: OrderModel) {
    this.ordersService.updateOrder(orderModel).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.refresh();
    });
  }

  loadCustomerToEdit(orderId: number) {
    this.ordersService.getOrderById(orderId).subscribe(order => {
      this.message = "";
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}



