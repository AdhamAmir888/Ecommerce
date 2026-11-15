import { ProductType } from "@/types/products.t";

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }

}
export async function getProductsByBrand(brandId: string): Promise<ProductType[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
