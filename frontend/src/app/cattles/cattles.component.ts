import { CattleBreed } from './CattleBreed.enum';
import { CattleType } from './CattleType.enum';
import { CattleModel } from './cattle_model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CattlesService } from './cattles.service';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


/**
 * @title Table with pagination
 */
@Component({
  selector: 'cattles',
  templateUrl:'./cattles.component.html',
  styleUrls: ['./cattles.component.css']
})
export class CattlesComponent implements OnInit{
  cattleModel: CattleModel = new CattleModel;
  allCattles?: Observable<CattleModel[]> ;
  cattleIdUpdate: number = 0;
  message = "";

  title = "List of Cattles";
  toggleAdd : boolean = false;
  toggleViewEdit : boolean = false;

  choosen : number = 0;

  public cattlesList: CattleModel[] = [];
  cattleForm: any;

  cattleType = Object.keys(CattleType).filter((item) => {
    return isNaN(Number(item));
});

  cattleBreed = Object.keys(CattleBreed).filter((item) => {
    return isNaN(Number(item));
});

displayedColumns: string[] = ['select', 'cattleId', 'cattleType', 'cattleBreed', 'age', 'milkCapacity', 'lactation', 'deliveryDate', 'calfGendar', 'Actions'];
  dataSource = new MatTableDataSource<CattleModel>(this.cattlesList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formbulider: FormBuilder, private cattlesService: CattlesService,
    private modalService: NgbModal, private reactiveForms:ReactiveFormsModule) {
    this.cattlesService.getCattlesList().subscribe(data => this.cattlesList = data);
   }

   ngAfterViewInit() {
    this.cattleForm = this.formbulider.group({
      cattleId: ['', [Validators.required]],
      cattleType: ['', [Validators.required]],
      cattleBreed: ['', [Validators.required]],
      age: ['', [Validators.required]],
      milkCapacity: ['', [Validators.required]],
      lactation: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      calfGendar: ['', [Validators.required]],
    });
    this.loadAllCattles();

    this.cattlesService.getCattlesList().subscribe((dataResponse: any) => {
      this.dataSource = dataResponse;
      setTimeout(() => this.dataSource.paginator = this.paginator);
      console.log(this.paginator);
      });
   }

   ngOnInit() {

  }

  loadAllCattles() {
    this.allCattles = this.cattlesService.getCattlesList();
  }

  isAddClicked(){
    this.toggleAdd = true;
  }

  isViewEditClicked(){
    if(this.choosen != 0 ){
      this.toggleViewEdit = true;
      this.cattleIdUpdate = this.choosen;
      this.loadCattleToEdit(this.cattleIdUpdate);
     }
    else{
      alert("Please choose a record to Update");
    }
  }

  isDeleteClicked(){
    if(this.choosen != 0 ){
      this.cattleIdUpdate = this.choosen;
      this.deleteCattle(this.cattleIdUpdate);
     }
    else{
      alert("Please choose a record to Delete");
    }
  }


  saveOrUpdate(cattleForm:ReactiveFormsModule) {
    this.cattleModel = this.cattleForm.value;
    if (this.toggleAdd) {
      this.saveCattle(this.cattleModel);
    }else if(this.toggleViewEdit){
      this.cattleIdUpdate = this.choosen;
      this.cattleModel.cattleId = this.cattleIdUpdate;
      this.updateCattle(this.cattleModel);
    }
    this.cattleForm.reset();
    this.loadAllCattles();
  }

  deleteCattle(cattleId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.cattlesService.deleteCattleById(cattleId).subscribe(() => {
        this.message = 'Record Deleted Succefully';
        this.loadAllCattles();
        this.cattleIdUpdate = 0;
        this.cattleForm.reset();
      });
    }
  }

  onCancel() {
    this.toggleAdd = false;
    this.toggleViewEdit = false;
    this.cattleForm.reset();
  }

  saveCattle(cattleModel: CattleModel){
      this.cattlesService.createCattle(cattleModel).subscribe(
        () => {
          this.message = 'Record Saved Successfully';
          this.loadAllCattles();
          this.cattleIdUpdate = 0;
          this.cattleForm.reset();
          this.toggleAdd = false;
          this.toggleViewEdit = false;
        }
      );
  }

  updateCattle(cattleModel: CattleModel){
      cattleModel.cattleId =  this.cattleIdUpdate;
      this.cattlesService.updateCattle(cattleModel).subscribe(() => {
        this.message = 'Record Updated Successfully';
        this.loadAllCattles();
        this.cattleIdUpdate = 0;
        this.cattleForm.reset();
        this.toggleAdd = false;
        this.toggleViewEdit = false;
      });
  }

  loadCattleToEdit(cattleId: number) {
    this.cattlesService.getCattleById(cattleId).subscribe(cattle=> {
      this.message = "";

      this.cattleIdUpdate = cattle.cattleId;
      this.cattleForm.controls['cattleType'].setValue(cattle.cattleType);
     this.cattleForm.controls['cattleBreed'].setValue(cattle.cattleBreed);
      this.cattleForm.controls['age'].setValue(cattle.age);
      this.cattleForm.controls['milkCapacity'].setValue(cattle.milkCapacity);
      this.cattleForm.controls['lactation'].setValue(cattle.lactation);
      this.cattleForm.controls['deliveryDate'].setValue(cattle.deliveryDate);
      this.cattleForm.controls['calfGendar'].setValue(cattle.calfGendar);

    });
  }
}


