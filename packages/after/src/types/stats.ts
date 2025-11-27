export interface StatusCardItem {
  key: string;
  label: string;
  value: number;
}

export type PostStatKey =
  | "total"
  | "published"
  | "draft"
  | "archived"
  | "views";

export type UserStatKey =
  | "total"
  | "active"
  | "inactive"
  | "suspended"
  | "admin";
