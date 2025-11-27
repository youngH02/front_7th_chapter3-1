import type { Meta, StoryObj } from "@storybook/react";
import StatusCard from "../../components/common/StatusCards";

const meta = {
  title: "Common/StatusCards",
  component: StatusCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        key: "total",
        label: "Total Users",
        value: 1234,
        accentColorVar: "--primary",
      },
      {
        key: "active",
        label: "Active Users",
        value: 1100,
        accentColorVar: "--stat-user-active",
      },
      {
        key: "inactive",
        label: "Inactive Users",
        value: 134,
        accentColorVar: "--stat-user-inactive",
      },
    ],
  },
};
