export class Recipe {
  public _id!: string;

  constructor(
    type: RecipeType,
    ingredients: Ingredient[],
    pokemon?: string[]
  ) {}
}

export interface Ingredient {
  _id: string;
  name: string;
  quality: string;
}

export type RecipeType =
  | 'Mulligan Stew à la Cube'
  | 'Red Stew à la Cube'
  | 'Blue Soda à la Cube'
  | 'Yellow Curry à la Cube'
  | 'Gray Porridge à la Cube'
  | 'Mouth-Watering Dip à la Cube'
  | 'Plain Crepe à la Cube'
  | 'Sludge Soup à la Cube'
  | 'Mud Pie à la Cube'
  | 'Veggie Smoothie à la Cube'
  | 'Honey Nectar à la Cube'
  | 'Brain Food à la Cube'
  | 'Stone Soup à la Cube'
  | 'Light-as-Air Casserole à la Cube'
  | 'Hot Pot à la Cube'
  | 'Watt a Risotto à la Cube'
  | 'Get Swole Syrup à la Cube'
  | 'Ambrosia of Legends à la Cube';
