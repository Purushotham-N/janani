import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CattleModel } from './cattle_model';

@Injectable({
  providedIn: 'root'
})
export class CattlesService {
  
  constructor(private http: HttpClient) { }
  private URI: string = "http://127.0.0.1:8084/api/v1/cattles/";


  public getCattlesList(): Observable<CattleModel[]> {
    let cattlesList = this.http.get<CattleModel[]>(this.URI);
    return cattlesList;
  }

  public getCattleById(id:number): Observable<CattleModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let individualCattle = this.http.get<CattleModel>(this.URI+id, httpOptions );
    return individualCattle;
  }

  public saveCattle(cattle: CattleModel): Observable<CattleModel> {
    return this.http.post<CattleModel>(this.URI, cattle,{
      headers : new HttpHeaders({
        'content-type':'application/json'
      })
    })
  }

  createCattle(cattle: CattleModel): Observable<CattleModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<CattleModel>(this.URI, cattle, httpOptions);  
  }  

  updateCattle(cattle: CattleModel): Observable<CattleModel> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    let id:number = cattle.cattleId;
    console.log("service: updateCattle:::"+this.URI+id);
    console.log("URL printing:"+this.URI+cattle.cattleId);  
    return this.http.put<CattleModel>(this.URI+id, cattle, httpOptions);  
  } 

  public deleteCattleById(id:number): Observable<CattleModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<CattleModel>(this.URI+id, httpOptions );;
  }
  
}
