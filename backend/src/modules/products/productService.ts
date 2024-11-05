import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { productRepository } from "@modules/products/productRepository";
import { TypePayloadProduct } from "@modules/products/productModel";

import { product } from "@prisma/client";

export const productService = {
    findAll: async () => {
        const productList = await productRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get all products success",
            productList,
            StatusCodes.OK
        );
    },
    
    create: async (payload: TypePayloadProduct) => {
        try {
            const checkProduct = await productRepository.findByName(payload.product_name);
            if (checkProduct) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Product name already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }
            const product = await productRepository.create(payload);
            return new ServiceResponse<product>(
                ResponseStatus.Success,
                "Create product success",
                product,
                StatusCodes.CREATED
            );
        } catch (ex) {
            const errorMessage = "Error creating product: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    update: async (id: string, payload: TypePayloadProduct) => {
        try {
            const checkProduct = await productRepository.findByIdAsync(id);
            if (!checkProduct) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Product not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            const product = await productRepository.update(id, payload);
            return new ServiceResponse<product>(
                ResponseStatus.Success,
                "Update product success",
                product,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error updating product: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    delete: async (id: string) => {
        try {
            const checkProduct = await productRepository.findByIdAsync(id);
            if (!checkProduct) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Product not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            await productRepository.delete(id);
            return new ServiceResponse<string>(
                ResponseStatus.Success,
                "Delete product success",
                "Product deleted successfully",
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error deleting product: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    findById: async (id: string) => {
        try {
            const product = await productRepository.findByIdAsync(id);
            if (!product) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Product not found",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }
            return new ServiceResponse<product>(
                ResponseStatus.Success,
                "Product found",
                product,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error fetching product: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },
};
