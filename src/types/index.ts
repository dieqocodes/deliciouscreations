type Users = {
  id: string;
  createdAt: Date;
  imageUrl: string;
  firstName: string;
  lastName: string | null;
};

type Recipes = {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
  description: string;
  imageUrl: string;
  category: string;
  ingredients: string[];
  instructions: string[];
};
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
