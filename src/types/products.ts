export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    created_at: Date;
    updated_at: Date;
};

export type GetProductsResponse = {
    products: Product[];
};

export type ProductQueryList = {
    search?: string;
    category?: string;
}