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
    alert("login::"+ this.email + "::"+ this.password);
      if(this.email  ===  "email@email.com"  &&  this.password  === "p@ssw0rd")
      {
        alert("if::"+ this.email + "::"+ this.password);
          this.router.navigate(['success']);
      }
      else
      {
        alert("else::"+ this.email + "::"+ this.password);
          this.dialog.open(MessageComponent,{ data: {
          message:  "Error!!!"
          }});
      }
  }

}
