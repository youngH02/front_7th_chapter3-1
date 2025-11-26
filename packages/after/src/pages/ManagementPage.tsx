import React, { useState, useEffect } from "react";
import { Table } from "../components/organisms";
import Modal from "@/components/Modal";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import "../styles/components.css";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import UserForm from "@/components/UserForm";
import ArticleForm from "@/components/ArticleForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type TUserFormValues } from "@/schemas/userSchema";
import {
  articleSchema,
  type TArticleFormValues,
} from "@/schemas/articleSchema";
import StatusCard from "@/components/StatusCards";
import type { StatusCardItem } from "@/constants/stats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { POST_STAT_CONFIG, USER_STAT_CONFIG } from "@/utils/statUtils";

type EntityType = "user" | "post";
type Entity = User | Post;
type StatusMetric = StatusCardItem;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [showErrorAlert, setShowErrorAlert] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
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
    loadData();
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

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

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: "데이터를 불러오는데 실패했습니다",
      });
    }
  };

  const handleReset = () => {
    //초기화 버튼
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    form.reset();
    formArticle.reset();
  };

  const handleCreate = async (values: TUserFormValues | TArticleFormValues) => {
    try {
      if (entityType === "user") {
        await userService.create(values as User);
      } else {
        await postService.create(values as Post);
      }

      await loadData();
      setIsCreateModalOpen(false);
      setPageAlert({
        type: "success",
        message: `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`,
      });
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: `${error.message || "생성에 실패했습니다"}`,
      });
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === "user") {
        await userService.update(selectedItem.id, form.getValues() as User);
      } else {
        await postService.update(selectedItem.id, formArticle.getValues());
      }

      await loadData();
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setPageAlert({
        type: "success",
        message: `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`,
      });
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: `${error.message || "수정에 실패했습니다"}`,
      });
    }
  };

  const onSubmit = () => {
    if (entityType === "user") {
      return form.handleSubmit(handleCreate);
    } else {
      return formArticle.handleSubmit(handleCreate);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setPageAlert({
        type: "success",
        message: "삭제되었습니다",
      });
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: `${error.message || "삭제에 실패했습니다"}`,
      });
    }
  };

  const handleStatusAction = async (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setPageAlert({
        type: "success",
        message: `${message}되었습니다`,
      });
    } catch (error: any) {
      setPageAlert({
        type: "error",
        message: `${error.message || "작업에 실패했습니다"}`,
      });
    }
  };

  const getStats = (): StatusMetric[] => {
    if (entityType === "user") {
      return USER_STAT_CONFIG(data as User[]);
    }
    return POST_STAT_CONFIG(data as Post[]);
  };

  const renderTableColumns = () => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        { key: "role", header: "역할", width: "120px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        { key: "actions", header: "관리", width: "200px" },
      ];
    } else {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        { key: "category", header: "카테고리", width: "140px" },
        { key: "status", header: "상태", width: "120px" },
        { key: "views", header: "조회수", width: "100px" },
        { key: "createdAt", header: "작성일", width: "120px" },
        { key: "actions", header: "관리", width: "250px" },
      ];
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1200px] mx-auto p-5">
        <div style={{ marginBottom: "20px" }}>
          <h1 className="text-2xl font-bold mb-1 text-gray-800">관리 시스템</h1>
          <p style={{ color: "#666", fontSize: "14px" }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #ddd",
            padding: "10px",
          }}>
          <div
            style={{
              marginBottom: "15px",
              borderBottom: "2px solid #ccc",
              paddingBottom: "5px",
            }}>
            <Button
              variant={entityType === "post" ? "default" : "outline"}
              size="md"
              className="mr-2"
              onClick={() => setEntityType("post")}>
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "default" : "outline"}
              size="md"
              onClick={() => setEntityType("user")}>
              사용자
            </Button>
          </div>

          <div>
            <Button
              size="lg"
              className="mb-4 text-right"
              onClick={() => setIsCreateModalOpen(true)}>
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

            <div className="bg-white border border-gray-200 p-2.5 overflow-auto">
              <Table
                columns={renderTableColumns()}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, "publish")}
                onArchive={(id) => handleStatusAction(id, "archive")}
                onRestore={(id) => handleStatusAction(id, "restore")}
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
