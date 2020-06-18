

import { Component, OnInit,  Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TableData } from '../recipe-list.component';


@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})

export class ShowRecipeComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ShowRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableData){}
    
    onClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){}
}

////error pop-up 
@Component({
  templateUrl: './show-error.component.html',
  
})
export class ShowErrorComponent{
}

///// delete 
@Component({
  templateUrl: './show-confirmation.component.html',
  
})
export class ShowConfirmationComponent{

}
