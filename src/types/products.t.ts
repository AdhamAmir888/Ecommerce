import { BrandType } from "./brands.t"
import { CategoryType } from "./category.t"
import { SubcategoryType } from "./subcategory.t"
export interface ProductType {
  sold: number
  images: string[]
  subcategory: SubcategoryType[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: CategoryType
  brand: BrandType
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
}


