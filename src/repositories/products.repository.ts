import { pool } from "../lib/db";
import { Product } from "../types/products";

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