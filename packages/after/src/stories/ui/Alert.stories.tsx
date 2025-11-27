import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Terminal, AlertCircle } from "lucide-react";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "info", "success"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "default",
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: "destructive",
  },
};

export const Info: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>This is an informational alert.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: "info",
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Operation completed successfully.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: "success",
  },
};
