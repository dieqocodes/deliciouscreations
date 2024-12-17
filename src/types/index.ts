import { Recipes, Users } from "@prisma/client";

export interface TRecipes {
  success: boolean;
  data?: Recipes[];
  err?: Error;
}

export interface TRecipe {
  success: boolean;
  data?: Recipes;
  err?: Error;
}

export interface TUsers {
  success: boolean;
  data?: Users[];
  err?: Error;
}

export interface TUser {
  success: boolean;
  data?: TData;
  err?: Error;
}

interface TData extends Users {
  recipes: Recipes[];
}

export interface TSearch {
  success: boolean;
  data: {
    users: Users[];
    recipes: Recipes[];
  };
}
