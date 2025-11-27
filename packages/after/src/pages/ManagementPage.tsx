import React, { useState, useEffect } from "react";
import { type User } from "../services/userService";
import { type Post } from "../services/postService";
import "../styles/components.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import UserForm from "@/components/features/UserForm";
import ArticleForm from "@/components/features/ArticleForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type TUserFormValues } from "@/utils/userSchema";
import { articleSchema, type TArticleFormValues } from "@/utils/articleSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Modal from "@/components/common/Modal";
import type { StatusCardItem } from "@/types/stats";
import { POST_STAT_CONFIG, USER_STAT_CONFIG } from "@/utils/statUtils";
import StatusCard from "@/components/common/StatusCards";
import { usePostManagement } from "@/hooks/usePostManagement";
import ManagementTable from "@/components/features/ManagementTable";
import { useUserManagement } from "@/hooks/useUserManagement";
import { ManagementHeader } from "@/components/features/ManagementHeader";
import { ManagementTabs } from "@/components/features/ManagementTabs";

type EntityType = "user" | "post";
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const {
    posts,
    handleStatusAction,
    postError,
    createPost,
    updatePost,
    deletePost,
    fetchPosts,
  } = usePostManagement();
  const { users, userError, createUser, updateUser, deleteUser, fetchUsers } =
    useUserManagement();
  const [pageAlert, setPageAlert] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const form = useForm<TUserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "user", status: "active" },
  });
  const formArticle = useForm<TArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: { title: "", category: "development" },
  });

  useEffect(() => {
    if (entityType === "user") {
      fetchUsers();
    } else {
      fetchPosts();
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, fetchUsers, fetchPosts]);

  useEffect(() => {
    if (postError) {
      setPageAlert({ type: "error", message: postError });
    }
    if (userError) {
      setPageAlert({ type: "error", message: userError });
    }
  }, [postError, userError]);

  // selectedItem이 바뀔 때만 reset
  useEffect(() => {
    if (selectedItem && entityType === "user") {
      const user = selectedItem as User;
      form.reset({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else if (selectedItem && entityType === "post") {
      const post = selectedItem as Post;
      formArticle.reset({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
      });
    }
  }, [selectedItem, entityType, form]);

  const onStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    const result = await handleStatusAction(id, action);

    if (result.success) {
      setPageAlert({ type: "success", message: result.message });
    } else {
      setPageAlert({ type: "error", message: result.message });
    }
  };

  const handleReset = () => {
    //초기화 버튼
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    form.reset();
    formArticle.reset();
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const processAction = async (
    actionPromise: Promise<{ success: boolean; message: string }>,
    onSuccess?: () => void
  ) => {
    try {
      const result = await actionPromise;
      if (result.success) {
        setPageAlert({ type: "success", message: result.message });
        onSuccess?.();
      } else {
        setPageAlert({ type: "error", message: result.message });
      }
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: error.message || "작업에 실패했습니다",
      });
    }
  };

  const handleCreate = async (values: TUserFormValues | TArticleFormValues) => {
    console.log("handleCreate values:", values);
    const action =
      entityType === "user"
        ? createUser(values as User)
        : createPost(values as Post);

    await processAction(action, () => setIsCreateModalOpen(false));
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    const action =
      entityType === "user"
        ? updateUser(selectedItem.id, form.getValues() as User)
        : updatePost(selectedItem.id, formArticle.getValues());

    await processAction(action, () => {
      setIsEditModalOpen(false);
      setSelectedItem(null);
    });
  };

  const onSubmit = () => {
    if (entityType === "user") {
      form.handleSubmit(handleCreate)();
    } else {
      formArticle.handleSubmit(handleCreate)();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const action = entityType === "user" ? deleteUser(id) : deletePost(id);

    await processAction(action);
  };

  const getStats = (): StatusCardItem[] => {
    if (entityType === "user") {
      return USER_STAT_CONFIG(users || []);
    }
    return POST_STAT_CONFIG(posts || []);
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto p-5" style={{ maxWidth: "1200px" }}>
        <ManagementHeader />

        <div className="bg-card border border-border p-2.5">
          <ManagementTabs
            entityType={entityType}
            setEntityType={setEntityType}
          />

          <div>
            <Button
              size="lg"
              className="mb-4 text-right"
              onClick={() => {
                setSelectedItem(null);
                setIsCreateModalOpen(true);
              }}>
              새로 만들기
            </Button>

            {pageAlert.type && (
              <div className="mb-3">
                <Alert
                  variant={
                    pageAlert.type === "success" ? "success" : "destructive"
                  }
                  onClose={() => setPageAlert({ ...pageAlert, type: null })}>
                  <AlertTitle>
                    {pageAlert.type === "success" ? "성공" : "오류"}
                  </AlertTitle>
                  <AlertDescription>{pageAlert.message}</AlertDescription>
                </Alert>
              </div>
            )}

            <StatusCard items={stats} />

            <div className="bg-card border border-border p-2.5 overflow-auto">
              <ManagementTable
                type={entityType}
                data={entityType === "user" ? users : posts}
                onStatusAction={onStatusAction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={handleReset}
        title={
          selectedItem
            ? `${entityType === "user" ? "사용자" : "게시글"} 수정`
            : `새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`
        }
        onConfirm={selectedItem ? handleUpdate : onSubmit}
        confirmText={selectedItem ? "수정 완료" : "생성"}
        cancelText="취소">
        <div>
          {selectedItem && (
            <div className="mb-4">
              <Alert variant="info">
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === "post" &&
                  ` | 조회수: ${(selectedItem as Post).views}`}
              </Alert>
            </div>
          )}

          {entityType === "user" ? (
            <UserForm
              form={form}
              handleClick={selectedItem ? handleUpdate : handleCreate}
            />
          ) : (
            <ArticleForm
              formArticle={formArticle}
              handleClick={selectedItem ? handleUpdate : handleCreate}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};
