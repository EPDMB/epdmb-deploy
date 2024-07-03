import { Seller } from "../../sellers/sellers.entity"
import { Product } from "../entities/products.entity"

export class CreateProductRequestDto{
    seller: Seller

    products: Product[]

    
}