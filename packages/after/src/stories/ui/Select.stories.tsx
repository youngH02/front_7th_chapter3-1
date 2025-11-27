import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectOption,
  SelectOptGroup,
} from "../../components/ui/select";

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectOption value="apple">Apple</SelectOption>
      <SelectOption value="banana">Banana</SelectOption>
      <SelectOption value="blueberry">Blueberry</SelectOption>
      <SelectOption value="grapes">Grapes</SelectOption>
      <SelectOption value="pineapple">Pineapple</SelectOption>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectOptGroup label="Fruits">
        <SelectOption value="apple">Apple</SelectOption>
        <SelectOption value="banana">Banana</SelectOption>
        <SelectOption value="blueberry">Blueberry</SelectOption>
        <SelectOption value="grapes">Grapes</SelectOption>
        <SelectOption value="pineapple">Pineapple</SelectOption>
      </SelectOptGroup>
      <SelectOptGroup label="Vegetables">
        <SelectOption value="aubergine">Aubergine</SelectOption>
        <SelectOption value="broccoli">Broccoli</SelectOption>
        <SelectOption value="carrot" disabled>
          Carrot
        </SelectOption>
        <SelectOption value="courgette">Courgette</SelectOption>
        <SelectOption value="leek">Leek</SelectOption>
      </SelectOptGroup>
    </Select>
  ),
};
