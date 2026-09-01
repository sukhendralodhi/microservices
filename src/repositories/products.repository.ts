import { pool } from "../lib/db";
import { Product, UpdateProductInput } from "../types/products";

type ProductRow = Product;

type ProductTaskFilters = {
    search?: string;
    category?: string;
}

export async function handleProducts(
    filters: ProductTaskFilters
): Promise<Product[]> {
    const conditions: string[] = [];
    const values: unknown[] = [];

    // console.log("filters", filters)

    let paramIndex = 1;

    if (filters.search) {
        conditions.push(`name ILIKE $${paramIndex}`);
        values.push(`%${filters.search}%`);
        paramIndex++;
    }

    if (filters.category) {
        conditions.push(`category = $${paramIndex}`);
        values.push(filters.category);
        paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const results = await pool.query<ProductRow>(

        `
         SELECT
            id,
            name,
            description,
            price,
            category,
            stock,
            created_at,
            updated_at
        FROM products
        ${whereClause}
        ORDER BY created_at DESC
        `,
        values
    );

    return results.rows
}

export async function handleProductsById(pId: string): Promise<Product> {
    const results = await pool.query<ProductRow>(

        `
        SELECT id,
            name,
            description,
            price,
            category,
            stock,
            created_at,
            updated_at
        FROM products
        WHERE id = $1
        `,
        [pId]
    );

    return results.rows[0] ?? null
}

export async function HandleUpdateProductById(pId: string, data: UpdateProductInput): Promise<Product | null> {
    const { name, description, price, stock } = data;
    const results = await pool.query<ProductRow>(
        `
        UPDATE products
        SET 
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            price = COALESCE($3, price),
            stock = COALESCE($4, stock),
            updated_at = NOW()
        WHERE id = $5
        RETURNING id, name, description, category, price, stock, created_at, updated_at
        `,
        [name, description, price, stock, pId]
    );

    return results.rows[0] ?? null
}