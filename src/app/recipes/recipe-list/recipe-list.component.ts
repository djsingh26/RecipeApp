import { IMG_URL } from './../../app.constants';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simply a test',IMG_URL),
    new Recipe('A Test Recipe','This is simply a test',IMG_URL)
];


  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
