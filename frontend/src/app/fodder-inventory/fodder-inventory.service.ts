import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FodderInventoryModel } from './fodder_inventory_model';


@Injectable({
  providedIn: 'root'
})
export class FodderInventoryService {

  constructor(private http: HttpClient) { }
  private URI: string = "http://127.0.0.1:8086/api/v1/fodder-inventory/";


  public getAllFodderInventoriesList(): Observable<FodderInventoryModel[]> {
    let fodderInventoriesList = this.http.get<FodderInventoryModel[]>(this.URI);
    return fodderInventoriesList;
  }

  public getFodderInventoryById(id:Number): Observable<FodderInventoryModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let fodderInventory = this.http.get<FodderInventoryModel>(this.URI+id, httpOptions );
    return fodderInventory;
  }

  public saveFodderInventory(fodderInventoryModel: FodderInventoryModel): Observable<FodderInventoryModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<FodderInventoryModel>(this.URI, fodderInventoryModel, httpOptions);
  }

  createFodderInventory(fodderInventoryModel: FodderInventoryModel): Observable<FodderInventoryModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<FodderInventoryModel>(this.URI, fodderInventoryModel, httpOptions);
  }

  updateFodderInventory(fodderInventoryModel: FodderInventoryModel): Observable<FodderInventoryModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let id:Number = fodderInventoryModel.fodderInventoryId;
    console.log("service: updateFodderInventory:::"+this.URI+id);
    console.log("URL printing:"+this.URI+fodderInventoryModel.fodderInventoryId);
    return this.http.put<FodderInventoryModel>(this.URI+id, fodderInventoryModel, httpOptions);
  }

  public deleteFodderInventory(id:Number): Observable<FodderInventoryModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<FodderInventoryModel>(this.URI+id, httpOptions );;
  }

}
