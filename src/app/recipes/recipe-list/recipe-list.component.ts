import { RecipeService } from './../recipe.service';
import { IMG_URL } from './../../app.constants';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];
  subscription: Subscription;


  // recipes: Recipe[] = [
  //   new Recipe('A Test Recipe','This is simply a test',IMG_URL),
  //   new Recipe('A Test Recipe','This is simply a test',IMG_URL)
  // ];


  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.reciepesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
