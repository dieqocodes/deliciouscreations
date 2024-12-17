import { TRecipe, TRecipes, TUsers, TUser, TSearch } from "../types";

export async function getAllRecipes(): Promise<TRecipes> {
  const response = await fetch("/api/recipes");
  const result = await response.json();
  return result;
}

export async function getUniqueRecipe(id: string): Promise<TRecipe> {
  const response = await fetch(`/api/recipes/${id}`);
  const result = await response.json();
  return result;
}

export async function getRecipesByCategory(id: string): Promise<TRecipes> {
  const response = await fetch(`/api/recipes/categories/${id}`);
  const result = await response.json();
  return result;
}

export async function getAllUsers(): Promise<TUsers> {
  const response = await fetch("/api/users");
  const result = await response.json();
  return result;
}

export async function getUniqueUser(id: string): Promise<TUser> {
  const response = await fetch(`/api/users/${id}`);
  const result = await response.json();
  return result;
}

export async function getSearch(id: string): Promise<TSearch> {
  const response = await fetch(`/api/search?q=${id}`);
  const result = await response.json();
  return result;
}

export async function getAuth(body: {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}) {
  const response = await fetch("/api/auth-callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}

export async function createRecipe(body: {
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  ingredients: string[];
  instructions: string[];
}) {
  const response = await fetch("/api/recipes/add-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}
