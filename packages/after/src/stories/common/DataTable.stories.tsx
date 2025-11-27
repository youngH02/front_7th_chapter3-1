import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "../../components/common/DataTable";
import { Button } from "../../components/ui/button";

const meta = {
  title: "Common/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
];

const columns = [
  { header: "ID", key: "id" },
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  {
    header: "Role",
    key: "role",
    render: (item: User) => <span className="font-bold">{item.role}</span>,
  },
  {
    header: "Actions",
    key: "actions",
    render: (item: User) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => alert(`Edit ${item.name}`)}>
        Edit
      </Button>
    ),
  },
];

export const Default: Story = {
  args: {
    columns: columns,
    data: data,
  },
};
