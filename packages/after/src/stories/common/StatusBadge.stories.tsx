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

export const UserActive: Story = {
  args: {
    status: "active",
  },
};

export const UserSuspended: Story = {
  args: {
    status: "suspended",
  },
};

export const PostPublished: Story = {
  args: {
    status: "published",
  },
};

export const PostDraft: Story = {
  args: {
    status: "draft",
  },
};

export const RoleAdmin: Story = {
  args: {
    status: "admin",
  },
};

export const RoleManager: Story = {
  args: {
    status: "manager",
  },
};

export const RoleUser: Story = {
  args: {
    status: "user",
  },
};

export const CategoryDevelopment: Story = {
  args: {
    status: "development",
  },
};

export const CategoryDesign: Story = {
  args: {
    status: "design",
  },
};

export const CategoryAccessibility: Story = {
  args: {
    status: "accessibility",
  },
};
