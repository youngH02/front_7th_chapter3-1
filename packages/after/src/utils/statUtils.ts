import { POST_STAT_META, USER_STAT_META } from "@/constants/stats";
import type { Post } from "@/services/postService";
import type { PostStatKey, StatusCardItem, UserStatKey } from "@/types/stats";

import type { User } from "@/services/userService";

type PostSummary = {
  total: number;
  views: number;
  status: Record<Post["status"], number>;
};

type UserSummary = {
  total: number;
  admin: number;
  status: Record<User["status"], number>;
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

const getUserSummary = (users: User[]): UserSummary =>
  users.reduce<UserSummary>(
    (acc, user) => {
      acc.total += 1;
      acc.status[user.status] += 1;
      if (user.role === "admin") {
        acc.admin += 1;
      }
      return acc;
    },
    {
      total: 0,
      admin: 0,
      status: {
        active: 0,
        inactive: 0,
        suspended: 0,
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

const getUserValueByKey = (key: UserStatKey, summary: UserSummary) => {
  switch (key) {
    case "total":
      return summary.total;
    case "admin":
      return summary.admin;
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

export const USER_STAT_CONFIG = (users: User[]): StatusCardItem[] => {
  const summary = getUserSummary(users);

  const order: UserStatKey[] = [
    "total",
    "active",
    "inactive",
    "suspended",
    "admin",
  ];

  return order.map((key) => ({
    key,
    label: USER_STAT_META[key].label,
    value: getUserValueByKey(key, summary),
    accentColorVar: USER_STAT_META[key].accent,
  }));
};
