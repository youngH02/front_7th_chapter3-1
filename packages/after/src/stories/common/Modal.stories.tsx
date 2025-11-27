import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../../components/common/Modal";
import { useState } from "react";
import { Button } from "../../components/ui/button";

const meta = {
  title: "Common/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert("Confirmed!");
            setIsOpen(false);
          }}>
          <p>This is the modal content.</p>
        </Modal>
      </>
    );
  },
  args: {
    title: "Example Modal",
    isOpen: false, // Controlled by render
    children: null, // Controlled by render
    onClose: () => {},
  },
};
