import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingButton from "./LoadingButton";

interface ActionConfirmationDialogProps {
  verb: string;
  noun: string;
  isOpen: boolean;
  isLoading: boolean;
  canCancel?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  loadingVerb: string;
  confirmVerb: string;
  triggerElement?: React.ReactNode;
}

const ActionConfirmationDialog: React.FC<ActionConfirmationDialogProps> = ({
  verb,
  noun,
  isOpen,
  isLoading = false,
  canCancel = false,
  onConfirm,
  onOpenChange,
  loadingVerb,
  confirmVerb,
  triggerElement,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {`Are you sure you want to ${verb} this ${noun}?`}
          </DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. It will permanently ${verb} this ${noun}.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isLoading || canCancel}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            disabled={isLoading}
            text={`Confirm ${confirmVerb}`}
            loadingText={loadingVerb}
            onClick={onConfirm}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionConfirmationDialog;
