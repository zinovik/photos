import axios from "axios";
import { Category } from "../types/Category";

let loadedCategories: Category[] = [];

export const loadCategories = async (): Promise<void> => {
  const response = await axios.get<Category[]>("/data/categories.json");

  loadedCategories = response.data;
};

export const getCategories = async (parent?: string): Promise<Category[]> => {
  if (loadedCategories.length === 0) {
    await loadCategories();
  }

  return [...loadedCategories]
    .filter(
      (category) => category.slug === parent || category.parent === parent
    )
    .sort((c1, c2) => (c1.order || 0) - (c2.order || 0));
};
