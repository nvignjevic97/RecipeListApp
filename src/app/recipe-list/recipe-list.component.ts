import { ShowRecipeComponent, ShowErrorComponent, ShowConfirmationComponent } from './show-recipe/show-recipe.component';
import { MatDialog, MatDialogModule, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { IRecipe } from './recipe';
import { RecipeService } from './recipe.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { resourceUsage } from 'process';
import { BindingFlags } from '@angular/compiler/src/core';

export interface TableData {
  name: string;
  source: string;
  ingredients: string;
  preparationInstruction: Text;
  prepartionTime: number;
  numberOfIngredients: number;
}


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class RecipeListComponent implements OnInit {
  pageTitle: string = 'RecipeList';
  pageSize = 10;
 

  formGroup: FormGroup;
  _filterRecipe: string;
  public get filterRecipe(): string {
    return this._filterRecipe;
  }

  public set filterRecipe(value: string) {
    this._filterRecipe = value;
    this.filteredRecipes = this.filterRecipe
      ? this.performFilter(this.filterRecipe)
      : this.recipes;
  }

  recipes: IRecipe[] = [];
  filteredRecipes: Array<IRecipe> = [];
  
  constructor(private recipeService: RecipeService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public dataShared: any
              ) 
              {
                this.createForm();
        this.formGroup = new FormGroup({
         name: new FormControl(),
         source:new FormControl(),
         ingredients: new FormControl(),
         instruction: new FormControl(),
         time: new FormControl()
        });
  }
  
  ///Required Form
  createForm() {
    this.formGroup = this.fb.group({
       name: ['', Validators.required ],
       source: ['', Validators.required ],
       Ingredients: ['', Validators.required],
       PreparationInstruction: ['', Validators.required],
       PreparationTime: ['', Validators.required]
    });
  }


  ////Enter  recipe in table
  recipeCreate(){
    var custom = new IRecipe();
    custom.recipeID = this.filteredRecipes.length+1;
    custom.recipeName = this.formGroup.controls['name'].value;
    custom.recipeSource = this.formGroup.controls['source'].value;
    custom.recipeIngredients = this.formGroup.controls['ingredients'].value.split(' ');
    custom.recipeNumberofIngredients = custom.recipeIngredients.length;
    custom.recipePreparationInstruction = this.formGroup.controls['instruction'].value;
    custom.recipePrepartionTime = this.formGroup.controls['time'].value;
    
    
    if(!this.formGroup.controls['name'].errors && 
      !this.formGroup.controls['source'].errors &&
      !this.formGroup.controls['ingredients'].errors &&
      !this.formGroup.controls['instruction'].errors &&
     !this.formGroup.controls['time'].errors) 
     {
      this.filteredRecipes.push(custom);
    }else{
     this.openDialogError()
    }
  }
  /// Show full recipe
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    let test = this.formGroup.controls['ingredients'].value.split(' ').length
    this.dialog.open(ShowRecipeComponent,{
      data: { name: this.formGroup.controls['name'].value,
              source: this.formGroup.controls['source'].value,
              ingredients: this.formGroup.controls['ingredients'].value,
              preparationInstruction: this.formGroup.controls['instruction'].value,
              prepartionTime: this.formGroup.controls['time'].value,
              numberOfIngredients: this.formGroup.controls['ingredients'].value.split(' ').length
            }
    });
  };

     
  ///Show Error in enter of recipe
  openDialogError(){
    this.dialog.open(ShowErrorComponent,{
    });
  }


  ///////Delete Row With Confirmation
  openDialogConfirmation(ID){
    const dialogRef = this.dialog.open(ShowConfirmationComponent,{
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        for(let i = 0; i < this.filteredRecipes.length;i++){
          if(this.filteredRecipes[i].recipeID == ID){
            this.filteredRecipes.splice(i,1);
          }
        }
      }
    });
  }

  /////Filter recipe by Name
  performFilter(filterBy: string): IRecipe[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.recipes.filter(
      (recipes: IRecipe) =>
        recipes.recipeName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.filteredRecipes = this.recipes; 
  }


}
