import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {} from '@angular/material/'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Nuevo","Usado","TerceraMano"];
  productForm !: FormGroup;
  actionBtn : String = "Save"


//esta es la forma en que inyectamos el formbuilder, el api service y el componente dialog en el constructor
  constructor(private formBuilder : FormBuilder, private api : ApiService,@Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef : MatDialogRef<DialogComponent>) { }
  ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    productName : ['', Validators.required],
    category : ['', Validators.required],
    freshness : ['', Validators.required],
    price : ['', Validators.required],
    comment : ['', Validators.required],
    date : ['', Validators.required],
  });
  //console.log(this.editData);

  if(this.editData){
    this.actionBtn = "Update";

    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['date'].setValue(this.editData.date);
  }
  }
addProduct(){
if(!this.editData){
//console.log(this.productForm.value)
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
}else{
this.updateProduct()
}
}
updateProduct(){
  this.api.putProduct(this.productForm.value, this.editData.id)
  .subscribe({
  next:(res)=>{
  alert('Product updated successfully ! ');
  this.productForm.reset();
  this.dialogRef.close('update');
  },
  error:()=>{
    alert("error while update the record")


  }


  })
}
}
