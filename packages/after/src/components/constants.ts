import type { StatusCardItem } from "@/components/StatusCards";
import type { Post } from "@/services/postService";

type PostStatKey = "total" | "published" | "draft" | "archived" | "views";

const POST_STAT_META: Record<PostStatKey, { label: string; accent: string }> = {
  total: { label: "전체", accent: "--primary" },
  published: { label: "게시됨", accent: "--stat-post-published" },
  draft: { label: "임시저장", accent: "--stat-post-draft" },
  archived: { label: "보관됨", accent: "--stat-post-archived" },
  views: { label: "총 조회수", accent: "--stat-post-views" },
};

type PostSummary = {
  total: number;
  views: number;
  status: Record<Post["status"], number>;
};

const getPostSummary = (posts: Post[]): PostSummary =>
  posts.reduce<PostSummary>(
    (acc, post) => {
      acc.total += 1;
      acc.status[post.status] += 1;
      acc.views += post.views;
      return acc;
    },
    {
      total: 0,
      views: 0,
      status: {
        draft: 0,
        published: 0,
        archived: 0,
      },
    }
  );

const getValueByKey = (key: PostStatKey, summary: PostSummary) => {
  switch (key) {
    case "total":
      return summary.total;
    case "views":
      return summary.views;
    default:
      return summary.status[key];
  }
};

export const POST_STAT_CONFIG = (posts: Post[]): StatusCardItem[] => {
  const summary = getPostSummary(posts);

  const order: PostStatKey[] = [
    "total",
    "published",
    "draft",
    "archived",
    "views",
  ];

  return order.map((key) => ({
    key,
    label: POST_STAT_META[key].label,
    value: getValueByKey(key, summary),
    accentColorVar: POST_STAT_META[key].accent,
  }));
};
