import redisClient from "../config/redis";
import { PRODUCT_CACHE_TTL, UUID_REGEX } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { handleProducts, handleProductsById, HandleUpdateProductById } from "../repositories/products.repository";
import { GetProductsResponse, Product, ProductQueryList, UpdateProductInput } from "../types/products";


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

    // create product key 
    const cacheKey = `product:${pId}`;

    // check redis if product is there 
    const cachedProduct = await redisClient.get(cacheKey);

    // If found in cache, return it
    if (cachedProduct) {
        console.log("Cache HIT");
        return JSON.parse(cachedProduct) as Product;
    }

    console.log("Cache MISS");

    if (!UUID_REGEX.test(pId)) {
        throw new AppError(400, "Invalid product id");
    }

    const product = await handleProductsById(pId);

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    await redisClient.set(
        cacheKey,
        JSON.stringify(product),
        {
            EX: PRODUCT_CACHE_TTL
        }
    )

    return product;
}

export async function handleProductUpdate(pId: string, data: UpdateProductInput): Promise<Product> {

    if (!UUID_REGEX.test(pId)) {
        throw new AppError(400, "Invalid product id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new AppError(400, "At least one field is required");
    }

    const product = await HandleUpdateProductById(pId, data);

    if (!product) {
        throw new AppError(404, "Product not found");
    }

    // if check if that product exist in redis 
    const chacheKey = `product:${pId}`;

    try {
        await redisClient.del(chacheKey);
        console.log("Cache invalidated");
    } catch (error) {
        console.error("Failed to invalidate Redis cache:", error);
    }

    return product;
}