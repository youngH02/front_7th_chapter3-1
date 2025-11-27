import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config: Record<
    string,
    {
      variant: "default" | "warning" | "destructive" | "success";
      label: string;
    }
  > = {
    // User Status
    active: { variant: "success", label: "활성" },
    suspended: { variant: "destructive", label: "정지" },
    // Post Status
    published: { variant: "success", label: "게시됨" },
    draft: { variant: "warning", label: "임시저장" },
    archived: { variant: "destructive", label: "보관됨" },
    // Role
    admin: { variant: "destructive", label: "관리자" },
    manager: { variant: "default", label: "매니저" },
    moderator: { variant: "warning", label: "운영자" },
    user: { variant: "default", label: "사용자" },
    // Category
    development: { variant: "default", label: "개발자" },
    design: { variant: "warning", label: "디자이너" },
    accessibility: { variant: "destructive", label: "접근성" },
  };

  const { variant, label } = config[status] || {
    variant: "default",
    label: status,
  };

  return <Badge variant={variant}>{label}</Badge>;
};
