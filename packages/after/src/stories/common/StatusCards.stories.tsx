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
      },
      {
        key: "active",
        label: "Active Users",
        value: 1100,
      },
      {
        key: "inactive",
        label: "Inactive Users",
        value: 134,
      },
    ],
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">User Stats</h3>
        <StatusCard
          items={[
            { key: "total", label: "Total Users", value: 1234 },
            { key: "active", label: "Active Users", value: 890 },
            { key: "inactive", label: "Inactive Users", value: 234 },
            { key: "suspended", label: "Suspended", value: 56 },
            { key: "admin", label: "Admins", value: 12 },
          ]}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Post Stats</h3>
        <StatusCard
          items={[
            { key: "total", label: "Total Posts", value: 5678 },
            { key: "published", label: "Published", value: 4321 },
            { key: "draft", label: "Drafts", value: 123 },
            { key: "archived", label: "Archived", value: 456 },
            { key: "views", label: "Total Views", value: 123456 },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    items: [],
  },
};
