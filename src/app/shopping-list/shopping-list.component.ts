import { ShoppingListService } from './shopping-list.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[] = [
  //   new Ingredient('cardamom',1),
  //   new Ingredient('Apples', 10),
  // ];

  ingredients: Ingredient[] = [];
  private igChangedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangedSub = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy() : void {
    this.igChangedSub.unsubscribe();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

}

export class Ingredient {
  // public name: string;
  // public amount: number;

  // constructor(name: string, amount: number) {
  //   this.name = name;
  //   this.amount = amount;
  // }

  constructor(public name: string, public amount: number) {}

}
