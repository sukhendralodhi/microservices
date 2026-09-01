import { TaskStatus } from "../types/task";

export const MINIMUM_PASSWORD_LENGTH = 6;
export const SALT = 10;
export const TITLE_MAX_CHARACTER = 100;
export const VALID_STATUSES: TaskStatus[] = [
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
];

export const ALLOWED_SORT_FIELDS = [
    "title",
    "status",
    "created_at",
    "updated_at"
] as const;

export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;