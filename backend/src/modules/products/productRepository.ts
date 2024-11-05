import prisma from "@src/db";
import { product } from "@prisma/client";
import { TypePayloadProduct } from "@modules/products/productModel";

export const Keys = [
    "id",
    "product_name",
    "price",
    "category_id",
    "created_at",
    "updated_at"
];

export const productRepository = {
    findAllAsync: async () => {
        return prisma.product.findMany({
            select: {
                product_name: true,
                price: true,
                category_id: true,
                id: true,
            }
        });
    },

    findByName: async <Key extends keyof product>(
        product_name: string,
        keys = Keys as Key[]
    ) => {
        return prisma.product.findFirst({
            where: { product_name: product_name }, // Using findFirst since product_name is not unique
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<product, Key> | null>;
    },    
    create: async (payload: TypePayloadProduct) => {
        const product_name = payload.product_name.trim();
        const setPayload: any = {
            product_name: product_name,
            price: payload.price,
            category_id: payload.category_id.trim(),
        };

        return await prisma.product.create({
            data: setPayload,
        });
    },

    findByIdAsync: async <Key extends keyof product>(
        id: string,
        keys = Keys as Key[]
    ) => {
        return prisma.product.findUnique({
            where: { id: id },
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<product, Key> | null>;
    },

    update: async (
        id: string,
        payload: TypePayloadProduct
    ) => {
        const trimId = id.trim();
        const trimProductName = payload.product_name.trim();
        const setPayload: any = {
            product_name: trimProductName,
            price: payload.price,
            category_id: payload.category_id.trim(),
        };

        return await prisma.product.update({
            where: { id: trimId },
            data: setPayload,
        });
    },

    delete: async (id: string) => {
        const trimId = id.trim();
        return await prisma.product.delete({
            where: { id: trimId }
        });
    }
};
