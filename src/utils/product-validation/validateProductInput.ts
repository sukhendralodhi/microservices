import { AppError } from "../../errors/AppError";
import { AddProductInput } from "../../types/products";

export function validateProductInput(data: AddProductInput) {

    if (!data.name?.trim()) {
        throw new AppError(400, "Name is required");
    }

    if (!data.description?.trim()) {
        throw new AppError(400, "Description is required");
    }

    if (
        data.price === undefined ||
        data.price === null ||
        typeof data.price !== "number" ||
        data.price < 0
    ) {
        throw new AppError(400, "Price must be a valid number");
    }

    if (
        data.stock === undefined ||
        data.stock === null ||
        typeof data.stock !== "number" ||
        data.stock < 0
    ) {
        throw new AppError(400, "Stock must be a valid number");
    }

    if (!data.category?.trim()) {
        throw new AppError(400, "Category is required");
    }
}