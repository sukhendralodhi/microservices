export type User = {
    id: string;
    email: string;
    role: string;
    created_at: Date;
};

export type DBUserRow = {
    id: string;
    email: string;
    role: string;
    created_at: Date;
};

export type DBUserRowWithPasswordRow = DBUserRow & {
    password_hash: string | null;
};

export type TokenPayload = {
    userId: string;
    email: string;
    role: string;
};


export type RegisterUserInput = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
}

export type CreateUserInput = {
    email: string;
    passwordHash: string;
    first_name: string;
    last_name: string;
    address: string | null;
    city: string | null;
    state: string | null;
};