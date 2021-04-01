import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICustomer } from '../Icustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(private http: HttpClient) { }
  private commonUri: string = "http://127.0.0.1:8080/api/v1/customers/";
  private addUri : string = this.commonUri+"add";

  public getCustomersList(): Observable<ICustomer[]> {
    let custList = this.http.get<ICustomer[]>(this.commonUri);
    return custList;
  }

  public saveCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.addUri, customer,{
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }
  
}
