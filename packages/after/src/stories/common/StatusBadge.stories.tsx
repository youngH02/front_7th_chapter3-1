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
    type: {
      control: "radio",
      options: ["user", "post"],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserActive: Story = {
  args: {
    type: "user",
    status: "active",
  },
};

export const UserSuspended: Story = {
  args: {
    type: "user",
    status: "suspended",
  },
};

export const PostPublished: Story = {
  args: {
    type: "post",
    status: "published",
  },
};

export const PostDraft: Story = {
  args: {
    type: "post",
    status: "draft",
  },
};
