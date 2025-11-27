import DataTable, { type TColumn } from "@/components/common/DataTable";
import { type FC, useMemo } from "react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ManagementActions } from "@/components/features/ManagementActions";

interface IProps {
  type: "user" | "post";
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onStatusAction: (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => void;
}

const ManagementTable: FC<IProps> = ({
  type,
  data,
  onEdit,
  onDelete,
  onStatusAction,
}) => {
  const columns = useMemo<TColumn<any>[]>(() => {
    const commonColumns: TColumn<any>[] = [{ key: "id", header: "ID" }];

    const actionColumn: TColumn<any> = {
      key: "actions",
      header: "관리",
      render: (item) => (
        <ManagementActions
          item={item}
          type={type}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusAction={onStatusAction}
        />
      ),
    };

    if (type === "user") {
      return [
        ...commonColumns,
        { key: "username", header: "사용자명" },
        { key: "email", header: "이메일" },
        {
          key: "role",
          header: "역할",
          render: (item) => <StatusBadge status={item.role} />,
        },
        {
          key: "status",
          header: "상태",
          render: (item) => <StatusBadge status={item.status} />,
        },
        { key: "createdAt", header: "생성일" },
        { key: "lastLogin", header: "마지막 로그인" },
        actionColumn,
      ];
    } else {
      return [
        ...commonColumns,
        { key: "title", header: "제목" },
        { key: "author", header: "작성자" },
        {
          key: "category",
          header: "카테고리",
          render: (item) => <StatusBadge status={item.category} />,
        },
        {
          key: "status",
          header: "상태",
          render: (item) => <StatusBadge status={item.status} />,
        },
        { key: "views", header: "조회수" },
        { key: "createdAt", header: "작성일" },
        actionColumn,
      ];
    }
  }, [type, onEdit, onDelete, onStatusAction]);

  return <DataTable columns={columns} data={data || []} />;
};

export default ManagementTable;
