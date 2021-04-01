import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService{

    constructor(private http: HttpClient){

    }
    getCourses(){
        let customerDataUrl = "http://localhost:8080/api/v1/customers/"
        return this.http.get(customerDataUrl)
    }
}