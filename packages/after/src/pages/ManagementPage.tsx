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
import StatusCard, { type StatusCardItem } from "@/components/StatusCards";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { POST_STAT_CONFIG } from "@/components/constants";

type EntityType = "user" | "post";
type Entity = User | Post;
type StatusMetric = StatusCardItem;

const buildUserStats = (users: User[]): StatusMetric[] => {
  const summary = users.reduce(
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
      status: {
        active: 0,
        inactive: 0,
        suspended: 0,
      } as Record<User["status"], number>,
      admin: 0,
    }
  );

  return [
    {
      key: "total",
      label: "전체",
      value: summary.total,
      accentColorVar: "--primary",
    },
    {
      key: "active",
      label: "활성",
      value: summary.status.active,
      accentColorVar: "--stat-user-active",
    },
    {
      key: "inactive",
      label: "비활성",
      value: summary.status.inactive,
      accentColorVar: "--stat-user-inactive",
    },
    {
      key: "suspended",
      label: "정지",
      value: summary.status.suspended,
      accentColorVar: "--stat-user-suspended",
    },
    {
      key: "admin",
      label: "관리자",
      value: summary.admin,
      accentColorVar: "--stat-user-admin",
    },
  ];
};

// const buildPostStats = (posts: Post[]): StatusMetric[] => {
//   const summary = posts.reduce(
//     (acc, post) => {
//       acc.total += 1;
//       acc.status[post.status] += 1;
//       acc.views += post.views;
//       return acc;
//     },
//     {
//       total: 0,
//       status: {
//         draft: 0,
//         published: 0,
//         archived: 0,
//       } as Record<Post["status"], number>,
//       views: 0,
//     }
//   );

//   return [
//     {
//       key: "total",
//       label: "전체",
//       value: summary.total,
//       accentColorVar: "--primary",
//     },
//     {
//       key: "published",
//       label: "게시됨",
//       value: summary.status.published,
//       accentColorVar: "--stat-post-published",
//     },
//     {
//       key: "draft",
//       label: "임시저장",
//       value: summary.status.draft,
//       accentColorVar: "--stat-post-draft",
//     },
//     {
//       key: "archived",
//       label: "보관됨",
//       value: summary.status.archived,
//       accentColorVar: "--stat-post-archived",
//     },
//     {
//       key: "views",
//       label: "총 조회수",
//       value: summary.views,
//       accentColorVar: "--stat-post-views",
//     },
//   ];
// };

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
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
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "생성에 실패했습니다");
      setShowErrorAlert(true);
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
      setAlertMessage(
        `${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "수정에 실패했습니다");
      setShowErrorAlert(true);
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
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "삭제에 실패했습니다");
      setShowErrorAlert(true);
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
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "작업에 실패했습니다");
      setShowErrorAlert(true);
    }
  };

  const getStats = (): StatusMetric[] => {
    if (entityType === "user") {
      return buildUserStats(data as User[]);
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
    <div style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}>
            관리 시스템
          </h1>
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
              className="mb-4 text-right"
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}>
              새로 만들기
            </Button>

            {showSuccessAlert && (
              <div className="mb-3">
                <Alert onClose={() => setShowSuccessAlert(false)}>
                  <AlertTitle>성공</AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div className="mb-3">
                <Alert
                  onClose={() => setShowErrorAlert(false)}
                  variant="destructive">
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}

            <StatusCard items={stats} />

            <div
              style={{
                border: "1px solid #ddd",
                background: "white",
                overflow: "auto",
              }}>
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
