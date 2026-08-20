export type Task = {
    id: string;
    title: string;
    status: string;
    user_id: string;
    created_at: Date;
    updated_at: string;
}

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED"

export type TaskFilters = {
    page: number;
    limit: number;
    query?: string;
    status?: TaskStatus;
    sortBy: "created_at";
    order: "asc" | "desc";
}

export type TaskListResponse = {
    tasks: Task[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

