import { Sex } from '../sex.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CattleBreed } from '../cattle_breed.enum';
import { CattleType } from '../cattle_type.enum';
import { CattleModel } from '../cattle_model';

@Component({
  selector: 'app-cattle-dialog',
  templateUrl: './cattle-dialog.component.html',
  styleUrls: ['./cattle-dialog.component.css']
})
export class CattleDialogComponent implements OnInit {
  cattleForm: FormGroup;

  cattleType = Object.keys(CattleType).filter((item) => {
    return isNaN(Number(item));
  });

  cattleBreed = Object.keys(CattleBreed).filter((item) => {
    return isNaN(Number(item));
  });

  sex = Object.keys(Sex).filter((item) => {
    return isNaN(Number(item));
  });


  constructor(public dialogRef: MatDialogRef<CattleDialogComponent>,
    private formbulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CattleModel) {
      this.cattleForm = this.formbulider.group({
        cattleId: ['', [Validators.required]],
        cattleType: ['', [Validators.required]],
        cattleBreed: ['', [Validators.required]],
        age: ['', [Validators.required]],
        milkCapacity: ['', [Validators.required]],
        lactation: ['', [Validators.required]],
        deliveryDate: ['', [Validators.required]],
        sex: ['', [Validators.required]],
      });

     this.cattleForm.setValue(data);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(Object.assign(new CattleModel(), this.cattleForm.value));
  }

}
