"use client";
import React, { useState } from "react";
import { useDeleteTaskMutation } from "./mutations";
import LoadingButton from "../core/LoadingButton";
import ActionConfirmationDialog from "../core/ActionConfirmationDialog";
import { Trash } from "lucide-react";

interface DeleteTaskDialogProps {
  taskId: string;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({ taskId }) => {
  const mutation = useDeleteTaskMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOnConfirm = () => {
    mutation.mutate(taskId, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <ActionConfirmationDialog
      verb="delete"
      noun="task"
      isLoading={mutation.isPending}
      loadingVerb="Deleting"
      isOpen={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      onConfirm={handleOnConfirm}
      confirmVerb="deletion"
      triggerElement={
        <LoadingButton
          variant="ghost"
          className="hover:bg-red-700"
          icon={<Trash />}
          loadingText="Deleting"
          onClick={() => setIsDialogOpen(true)}
        />
      }
    />
  );
};

export default DeleteTaskDialog;
