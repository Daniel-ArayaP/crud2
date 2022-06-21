import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {} from '@angular/material/'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Nuevo","Usado","TerceraMano"];
  productForm !: FormGroup;
//esta es la forma en que inyectamos el formbuilder, el api service y el componente dialog en el constructor
  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    productName : ['', Validators.required],
    category : ['', Validators.required],
    freshness : ['', Validators.required],
    price : ['', Validators.required],
    comment : ['', Validators.required],
    date : ['', Validators.required],
  })
  }
addProduct(){
console.log(this.productForm.value)
if(this.productForm.valid){
this.api.postProduct(this.productForm.value)
.subscribe({
next:(res)=>{
  alert("Felicidades el producto ha sido agregado exitosamente!!")
  this.productForm.reset();
  this.dialogRef.close('save');
},
error:()=>{
  alert("Error mientras agregamos tu producto")
}
})
}
}
}
