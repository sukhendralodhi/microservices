import redisClient from "../config/redis";
import { PRODUCT_CACHE_TTL, UUID_REGEX } from "../constants/constant";
import { AppError } from "../errors/AppError";
import { handleAddNewProduct, handleGetProductByName, handleProducts, handleProductsById, HandleUpdateProductById } from "../repositories/products.repository";
import { AddProductInput, GetProductsResponse, Product, ProductQueryList, UpdateProductInput } from "../types/products";
import { formatProductName } from "../utils/product-validation/formatProductName";
import { validateProductInput } from "../utils/product-validation/validateProductInput";
import { invalidateProductsCache } from "./productCache.service";


export async function handeGetProducts(
    query: ProductQueryList
): Promise<GetProductsResponse> {



    const search = query.search?.trim() || undefined;
    const category = query.category?.trim() || undefined;

    // console.log("search", search)
    const normalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : undefined;


    const productsCacheKey = `products:search:${search ?? "all"}:category:${normalizedCategory ?? "all"}`;

    const cachedProducts = await redisClient.get(productsCacheKey);

    if (cachedProducts) {
        console.log("cached hit");
        return JSON.parse(cachedProducts!) as GetProductsResponse
    }

    console.log("cache miss");

    const products = await handleProducts(
        { search, category: normalizedCategory }
    );

    await redisClient.setEx(productsCacheKey, PRODUCT_CACHE_TTL, JSON.stringify({ products }));
    console.log("Cache set");

    return {
        products
    }

}

export async function handleCreateproduct(
    data: AddProductInput
): Promise<Product> {


    if (!data || Object.keys(data).length === 0) {
        throw new AppError(400, "Product data is required");
    }

    validateProductInput(data);

    const formattedName = formatProductName(data.name);

    const existingProduct = await handleGetProductByName(data.name);

    if (existingProduct) {
        throw new AppError(
            409,
            "Product with this name already exists"
        );
    }

    const product = await handleAddNewProduct({
        ...data, name: formattedName
    });

    await invalidateProductsCache();

    return product;

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
    // create product key 
    const cacheKey = `product:${pId}`;
    const viewsKey = `product:${pId}:views`;

    let product: Product | null

    // check redis if product is there 
    const cachedProduct = await redisClient.get(cacheKey);

    // If found in cache, return it
    if (cachedProduct) {

        console.log("Cache HIT");

        return JSON.parse(cachedProduct) as Product;

    } else {
        console.log("Cache MISS");
        product = await handleProductsById(pId)
        if (!product) {
            throw new AppError(404, "Product not found");

        }
        await redisClient.setEx(
            cacheKey,
            PRODUCT_CACHE_TTL,
            JSON.stringify(product),
        );
        console.log("Cache SET");
    }

    await redisClient.incr(viewsKey);

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

export async function getProductViews(id: string): Promise<number> {
    const views = await redisClient.get(`product:${id}:views`);

    if (!views) {
        return 0;
    }

    return Number(views);
}