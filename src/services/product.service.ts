import { handleProducts } from "../repositories/products.repository";
import { GetProductsResponse, ProductQueryList } from "../types/products";


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