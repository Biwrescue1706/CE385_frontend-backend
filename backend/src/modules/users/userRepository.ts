import { users } from "@prisma/client";
import prisma from "@src/db";
import bcrypt from "bcrypt";

import { TypePayloadUser } from "@modules/users/userModel";

export const Keys = [
    "id", 
    "username",
    "password",
    "role",
    "created_at", 
    "updated_at"
];

export const userRepository = {
    findAllAsync: async () => {
        return prisma.users.findMany({
            select: {
                username: true,
                id: true
            }
        })  
    },

    findByName: async <Key extends keyof users>(
        username: string,
        keys = Keys as Key[]
    ) => {
        return prisma.users.findUnique({
            where: {username: username},
            select: keys.reduce(( obj, k) => ({...obj, [k]: true}), {}),
        }) as Promise<Pick<users, Key> | null>;
    },

    create: async (payload: TypePayloadUser) => {
        const usernameTrim = payload.username.trim();
        const passwordTrim = payload.password.trim();
        const role = payload.role.trim();

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(passwordTrim, salt);

        const setPayload: any = {
            username: usernameTrim,
            password: hashPassword,
            role: role,
        };

        return await prisma.users.create({
            data: setPayload,
        })
    },

    findByIdAsync: async <Key extends keyof users> (
        id: string,
        keys = Keys as Key[]
    ) => {
        return await prisma.users.findUnique({
            where: {id: id},
            select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        }) as Promise<Pick<users, Key> | null>;
    },

    update: async(
        id: string,
        payload: TypePayloadUser
    ) => {
        const trimId = id.trim();
        const trimUserName = payload.username.trim();
        const setPayload: any = {
            username: trimUserName,
        }
        return await prisma.users.update({
            where: {id: trimId},
            data: setPayload,
        }) 
    },

    delete: async (id: string) => {
        const trimId = id.trim();
        return await prisma.users.delete({
            where: {id: trimId}
        }) 
    }
};
