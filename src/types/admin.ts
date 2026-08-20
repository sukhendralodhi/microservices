import { Task } from "./task";

export type AdminTaskRow = Task & {
    user_email: string;
    user_role: string;
    first_name: string;
    last_name: string;
    address: string | null;
    city: string | null;
    state: string | null;
};

export type AdminTask = Task & {
    user: {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        address: string | null;
        city: string | null;
        state: string | null;
    };
};

