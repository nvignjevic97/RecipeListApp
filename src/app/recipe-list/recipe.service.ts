import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { IRecipe } from './recipe';

@Injectable({
    providedIn: 'root'
})
export class RecipeService{

    constructor(private htpp:HttpClientModule){
    }
   
    getRecipes(): IRecipe[] {
        return [
       
        ]
    }
}