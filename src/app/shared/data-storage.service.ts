import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
    .put(
      'https://recipe-app-b7780-default-rtdb.firebaseio.com/recipes.json'
      ,recipes
      )
    .subscribe(response => {
      // console.log(response);
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
        .get<Recipe[]>(
          'https://recipe-app-b7780-default-rtdb.firebaseio.com/recipes.json?auth='+ user.token
          // {
          //   params: new HttpParams().set('auth', user.token)
          // }
        );
    }),map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
      });
    }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))

    .pipe(
    );
    // .subscribe(recipes => {
    //   // console.log(recipes);
    //   this.recipeService.setRecipes(recipes);
    // });
  }
}
