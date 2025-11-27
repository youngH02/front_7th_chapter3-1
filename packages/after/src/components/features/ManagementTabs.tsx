import { Button } from "@/components/ui/button";

interface ManagementTabsProps {
  entityType: "user" | "post";
  setEntityType: (type: "user" | "post") => void;
}

export const ManagementTabs = ({
  entityType,
  setEntityType,
}: ManagementTabsProps) => {
  return (
    <div className="mb-4 border-b-2 border-gray-300 pb-1">
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
  );
};
