import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { Ingredient, Ingredients, RecipeTypes } from '../constants.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipeSub: Subscription;
  recipesByType = {};
  recipesByIngredient = {};

  filterByIngredient = false;
  isLoading = false;
  requestStatus = {
    message: '',
    succeeded: null,
  };

  recipeTypes = RecipeTypes;
  ingredients = Ingredients;

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.recipeService.getRecipes().subscribe({
      next: () => {
        this.isLoading = false;
        this.requestStatus = {
          message: '',
          succeeded: true,
        };
      },
      error: (err) => {
        this.isLoading = false;
        this.requestStatus = {
          message: err.message,
          succeeded: false,
        };
      },
    });
    this.recipeSub = this.recipeService.recipesUpdated.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        RecipeTypes.forEach((type) => {
          this.recipesByType[type] = this.recipes.filter(
            (r) => r.type === type
          );
        });
        Ingredients.forEach((ingredient) => {
          this.recipesByIngredient[ingredient] = this.recipes.filter((r) =>
            r.ingredients.includes(ingredient)
          );
        });
      }
    );
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  getRecipeImagePath(recipeType: string) {
    return `../../../assets/images/recipeTypes/${recipeType}.png`;
  }

  getIngredientImagePath(ingredient: string) {
    return `../../../assets/images/ingredients/${ingredient}.png`;
  }

  getRecipeCountByType(type: string) {
    return this.recipes.filter((r) => r.type === type).length;
  }

  getRecipeCountByIngredient(ingredient: Ingredient) {
    return this.recipes.filter((r) => r.ingredients.includes(ingredient))
      .length;
  }

  onDelete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
