import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../components/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Email",
    type: "email",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "Read only value",
    readOnly: true,
  },
};
