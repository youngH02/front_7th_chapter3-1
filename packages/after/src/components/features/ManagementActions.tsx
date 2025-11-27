import { Button } from "@/components/ui/button";

interface ManagementActionsProps {
  item: any;
  type: "user" | "post";
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onStatusAction: (
    id: number,
    action: "publish" | "archive" | "restore"
  ) => void;
}

export const ManagementActions = ({
  item,
  type,
  onEdit,
  onDelete,
  onStatusAction,
}: ManagementActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => onEdit(item)}>
        수정
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
        삭제
      </Button>

      {type === "post" && (
        <>
          {item.status === "draft" && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onStatusAction(item.id, "publish")}>
              게시
            </Button>
          )}
          {item.status === "published" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusAction(item.id, "archive")}>
              보관
            </Button>
          )}
          {item.status === "archived" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusAction(item.id, "restore")}>
              복원
            </Button>
          )}
        </>
      )}
    </div>
  );
};
