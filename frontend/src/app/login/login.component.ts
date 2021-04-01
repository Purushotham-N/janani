import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from  '@angular/core';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public  email:  string  =  "";
  public  password:  string  =  "";


  constructor(private  dialog:  MatDialog, private  router:  Router) { }

  ngOnInit():void {}

  login(){
      if(this.email  ===  "email@email.com"  &&  this.password  === "p@ssw0rd")
      {
          this.router.navigate(['success']);
      }
      else
      {
          this.dialog.open(MessageComponent,{ data: {
          message:  "Error!!!"
          }});
      }
  }

}
