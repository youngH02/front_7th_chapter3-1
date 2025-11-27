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
    const commonColumns: TColumn<any>[] = [
      { key: "id", header: "ID", width: "60px" },
    ];

    const actionColumn: TColumn<any> = {
      key: "actions",
      header: "관리",
      width: type === "user" ? "200px" : "250px",
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
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        { key: "role", header: "역할", width: "120px" },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (item) => <StatusBadge status={item.status} type="user" />,
        },
        { key: "createdAt", header: "생성일", width: "120px" },
        { key: "lastLogin", header: "마지막 로그인", width: "140px" },
        actionColumn,
      ];
    } else {
      return [
        ...commonColumns,
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        { key: "category", header: "카테고리", width: "140px" },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (item) => <StatusBadge status={item.status} type="post" />,
        },
        { key: "views", header: "조회수", width: "100px" },
        { key: "createdAt", header: "작성일", width: "120px" },
        actionColumn,
      ];
    }
  }, [type, onEdit, onDelete, onStatusAction]);

  return <DataTable columns={columns} data={data || []} />;
};

export default ManagementTable;
