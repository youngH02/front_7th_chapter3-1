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

export const POST_STAT_META: Record<
  PostStatKey,
  { label: string; accent: string }
> = {
  total: { label: "전체", accent: "--primary" },
  published: { label: "게시됨", accent: "--stat-post-published" },
  draft: { label: "임시저장", accent: "--stat-post-draft" },
  archived: { label: "보관됨", accent: "--stat-post-archived" },
  views: { label: "총 조회수", accent: "--stat-post-views" },
};

export type UserStatKey =
  | "total"
  | "active"
  | "inactive"
  | "suspended"
  | "admin";

export const USER_STAT_META: Record<
  UserStatKey,
  { label: string; accent: string }
> = {
  total: { label: "전체", accent: "--primary" },
  active: { label: "활성", accent: "--stat-user-active" },
  inactive: { label: "비활성", accent: "--stat-user-inactive" },
  suspended: { label: "정지", accent: "--stat-user-suspended" },
  admin: { label: "관리자", accent: "--stat-user-admin" },
};
