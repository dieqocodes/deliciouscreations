import { TRecipe, TRecipes, TUsers, TUser, TSearch } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRecipes(): Promise<TRecipes> {
  const response = await fetch(`${API_URL}/recipes`);
  const result = await response.json();
  return result;
}

export async function getUniqueRecipe(id: string): Promise<TRecipe> {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  const result = await response.json();
  return result;
}

export async function getRecipesByCategory(id: string): Promise<TRecipes> {
  const response = await fetch(`${API_URL}/recipes/categories/${id}`);
  const result = await response.json();
  return result;
}

export async function getAllUsers(): Promise<TUsers> {
  const response = await fetch("${API_URL}/users");
  const result = await response.json();
  return result;
}

export async function getUniqueUser(id: string): Promise<TUser> {
  const response = await fetch(`${API_URL}/users/${id}`);
  const result = await response.json();
  return result;
}

export async function getSearch(id: string): Promise<TSearch> {
  const response = await fetch(`${API_URL}/search?q=${id}`);
  const result = await response.json();
  return result;
}

export async function getAuth(body: {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}) {
  const response = await fetch("${API_URL}/auth-callback", {
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
  const response = await fetch("${API_URL}/recipes/add-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}
