import { OrderModel } from './order_model';
import {  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  constructor(private http: HttpClient) { }
  private URI: string = "http://127.0.0.1:8083/api/v1/orders/";


  public getOrdersList(): Observable<OrderModel[]> {
    let orderList = this.http.get<OrderModel[]>(this.URI);
    return orderList;
  }

  public getOrderById(id:number): Observable<OrderModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let individualOrder = this.http.get<OrderModel>(this.URI+id, httpOptions );
    return individualOrder;
  }

  public saveOrder(order: OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(this.URI, order,{
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }

  createOrder(order: OrderModel): Observable<OrderModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<OrderModel>(this.URI, order, httpOptions);  
  }  

  updateOrder(order: OrderModel): Observable<OrderModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let id:number = order.orderId;
    console.log("service: updateOrder:::"+this.URI+id);
    console.log("URL printing:"+this.URI+order.orderId);  
    return this.http.put<OrderModel>(this.URI+id, order, httpOptions);  
  } 

  public deleteOrderById(id:number): Observable<OrderModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<OrderModel>(this.URI+id, httpOptions );;
  }
  
}
