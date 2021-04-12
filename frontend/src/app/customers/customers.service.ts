import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CustomerModel } from './customer_model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(private http: HttpClient) { }
  private URI: string = "http://127.0.0.1:8080/api/v1/customers/";


  public getCustomersList(): Observable<CustomerModel[]> {
    let custList = this.http.get<CustomerModel[]>(this.URI);
    return custList;
  }

  public getCustomerById(id:number): Observable<CustomerModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let individualCustomer = this.http.get<CustomerModel>(this.URI+id, httpOptions );
    return individualCustomer;
  }

  public saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(this.URI, customer,{
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }

  createCustomer(customer: CustomerModel): Observable<CustomerModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CustomerModel>(this.URI, customer, httpOptions);  
  }  

  updateCustomer(customer: CustomerModel): Observable<CustomerModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let id:number = customer.customerId;
    console.log("service: updateConsumer:::"+this.URI+id);
    console.log("URL printing:"+this.URI+customer.customerId);  
    return this.http.put<CustomerModel>(this.URI+id, customer, httpOptions);  
  } 

  public deleteCustomerById(id:number): Observable<CustomerModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<CustomerModel>(this.URI+id, httpOptions );;
  }
  
}
