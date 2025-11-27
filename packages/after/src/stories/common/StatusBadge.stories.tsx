import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "../../components/common/StatusBadge";

const meta = {
  title: "Common/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "text",
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Controls 기반 단일 스토리 (status 조절)
 */
export const Playground: Story = {
  args: {
    status: "active",
  },
};

/**
 * 대표 status 예시를 한 화면에서 볼 수 있는 스토리
 */
export const AllStatuses = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <h3 className="w-full text-sm font-semibold text-muted-foreground mb-2">
          User Status
        </h3>
        <StatusBadge status="active" />
        <StatusBadge status="suspended" />
        <StatusBadge status="inactive" />
      </div>
      <div className="flex flex-wrap gap-2">
        <h3 className="w-full text-sm font-semibold text-muted-foreground mb-2">
          Post Status
        </h3>
        <StatusBadge status="published" />
        <StatusBadge status="draft" />
        <StatusBadge status="archived" />
      </div>
      <div className="flex flex-wrap gap-2">
        <h3 className="w-full text-sm font-semibold text-muted-foreground mb-2">
          Role
        </h3>
        <StatusBadge status="admin" />
        <StatusBadge status="manager" />
        <StatusBadge status="moderator" />
        <StatusBadge status="user" />
      </div>
      <div className="flex flex-wrap gap-2">
        <h3 className="w-full text-sm font-semibold text-muted-foreground mb-2">
          Category
        </h3>
        <StatusBadge status="development" />
        <StatusBadge status="design" />
        <StatusBadge status="accessibility" />
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true, exclude: ["status"] },
  },
};
