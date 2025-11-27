import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  type: "user" | "post";
}

export const StatusBadge = ({ status, type }: StatusBadgeProps) => {
  const getVariant = () => {
    if (type === "user") {
      switch (status) {
        case "active":
          return "default"; 
        case "suspended":
          return "destructive";
        default:
          return "secondary";
      }
    } else {
      switch (status) {
        case "published":
          return "default";
        case "draft":
          return "secondary";
        case "archived":
          return "outline";
        default:
          return "secondary";
      }
    }
  };

  const getLabel = () => {
    return status;
  };

  return <Badge variant={getVariant()}>{getLabel()}</Badge>;
};
