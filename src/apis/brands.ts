import { BrandType } from "@/types/brands.t";

export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const { data } = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function getBrand(id: string): Promise<BrandType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
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