import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config: Record<
    string,
    {
      variant: "default" | "secondary" | "destructive" | "outline";
      label: string;
    }
  > = {
    // User Status
    active: { variant: "default", label: "활성" },
    suspended: { variant: "destructive", label: "정지됨" },
    // Post Status
    published: { variant: "default", label: "게시됨" },
    draft: { variant: "secondary", label: "임시저장" },
    archived: { variant: "outline", label: "보관됨" },
    // Role
    admin: { variant: "destructive", label: "관리자" },
    manager: { variant: "default", label: "매니저" },
    moderator: { variant: "outline", label: "운영자" },
    user: { variant: "secondary", label: "사용자" },
    // Category
    development: { variant: "secondary", label: "개발자" },
    design: { variant: "default", label: "디자이너" },
    accessibility: { variant: "destructive", label: "접근성" },
  };

  const { variant, label } = config[status] || {
    variant: "secondary",
    label: status,
  };

  return <Badge variant={variant}>{label}</Badge>;
};
