import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type FC, type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
}

const Modal: FC<IProps> = ({
  isOpen,
  title,
  children,
  confirmText = "확인",
  cancelText = "취소",
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div>{children}</div>

        <DialogFooter>
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button size="md" onClick={onConfirm} disabled={isLoading}>
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
