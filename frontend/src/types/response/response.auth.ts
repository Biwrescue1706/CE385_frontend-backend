export type TypeAuth = {
    id: string;
    username: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export type AuthResponse = {
    success: boolean;
    message: string;
    responseObject: TypeAuth;
    statusCode: number;
};
