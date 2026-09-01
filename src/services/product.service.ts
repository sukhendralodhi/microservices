import { UUID_REGEX } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { handleProducts, handleProductsById } from "../repositories/products.repository";
import { GetProductsResponse, Product, ProductQueryList } from "../types/products";


export async function handeGetProducts(
    query: ProductQueryList
): Promise<GetProductsResponse> {

    const search = query.search?.trim() || undefined;
    const category = query.category?.trim() || undefined;
    // console.log("search", search)
    const normalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : undefined;

    const products = await handleProducts(
        { search, category: normalizedCategory }
    );

    return {
        products
    }

}

export async function handleGetProduct(
    pId: string
): Promise<Product | null> {

    if (!pId) {
        throw new AppError(400, "Product id is required");
    }

    if (!UUID_REGEX.test(pId)) {
        throw new AppError(400, "Invalid product id");
    }

    const product = await handleProductsById(pId);

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    return product;
}