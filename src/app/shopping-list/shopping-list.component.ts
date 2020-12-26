import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient('cardamom',1),
    new Ingredient('Apples', 10),

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
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
