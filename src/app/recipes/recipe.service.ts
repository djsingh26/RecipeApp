import { IMG_URL_2 } from './../app.constants';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { IMG_URL } from "../app.constants";
import { Ingredient } from '../shopping-list/shopping-list.component';
import { Recipe } from "./recipe.model";

//For using service from a service
@Injectable()
export class RecipeService {

  reciepesChanged = new Subject<Recipe[]>();

  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //   'Fried Rice',
  //   'This is simply a test',
  //   IMG_URL,
  //   [
  //     new Ingredient('Rice',1),
  //     new Ingredient('carrots', 20),
  //     new Ingredient('peas',5)
  //   ]),
  //   new Recipe(
  //     'Spaghetti!!',
  //     'This is simply a spaghetti',
  //     IMG_URL_2,
  //     [
  //       new Ingredient('Spaghetti',2),
  //       new Ingredient('Tomatoes',3),
  //       new Ingredient('Chicken', 3)
  //     ])
  // ];

  private recipes: Recipe[] = [];

constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.reciepesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.reciepesChanged.next(this.recipes.slice());
  }

  updateRecipe( index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.reciepesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,  1);
    this.reciepesChanged.next(this.recipes.slice());
  }

}
