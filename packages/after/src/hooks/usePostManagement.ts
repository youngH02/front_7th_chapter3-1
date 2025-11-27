import { postService, type Post } from "@/services/postService";
import { useCallback, useState } from "react";

export const usePostManagement = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [postError, setPostError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await postService.getAll();
      setPosts(data);
      setPostError(null);
    } catch (error: any) {
      setPostError(error.message || "데이터를 불러오는데 실패했습니다");
    }
  }, []);

  const createPost = async (post: Post) => {
    try {
      await postService.create(post);
      await fetchPosts();
      return { success: true, message: "게시글이 생성되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "생성에 실패했습니다",
      };
    }
  };

  const updatePost = async (id: number, values: Partial<Post>) => {
    try {
      await postService.update(id, values);
      await fetchPosts();
      return { success: true, message: "게시글이 수정되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "수정에 실패했습니다",
      };
    }
  };

  const deletePost = async (id: number) => {
    try {
      await postService.delete(id);
      await fetchPosts();
      return { success: true, message: "삭제되었습니다" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "삭제에 실패했습니다",
      };
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    try {
      if (action === "publish") await postService.publish(id);
      else if (action === "archive") await postService.archive(id);
      else if (action === "restore") await postService.restore(id);

      await fetchPosts();
      return {
        success: true,
        message: `${action === "publish" ? "게시" : action === "archive" ? "보관" : "복원"}되었습니다`,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `${error.message || "작업에 실패했습니다"}`,
      };
    }
  };

  return {
    posts,
    postError,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    handleStatusAction,
  };
};
