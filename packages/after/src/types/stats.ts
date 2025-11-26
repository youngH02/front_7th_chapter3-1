export interface StatusCardItem {
  key: string;
  label: string;
  value: number;
  accentColorVar?: string;
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
