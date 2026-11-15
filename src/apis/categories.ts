import { CategoryType } from "@/types/category.t";
import { SubcategoryType } from "@/types/subcategory.t";

export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }

}
export async function getCategory(id: string): Promise<CategoryType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getSubcategories(id: string): Promise<SubcategoryType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}