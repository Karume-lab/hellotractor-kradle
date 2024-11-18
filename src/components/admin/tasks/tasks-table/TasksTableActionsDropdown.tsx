import React from "react";
import TaskActionsDropdown from "@/components/tasks/TaskActionsDropdown";

interface TasksTableActionsDropdownProps {
  taskId: string;
}

const TasksTableActionsDropdown: React.FC<TasksTableActionsDropdownProps> = ({
  taskId,
}) => {
  return <TaskActionsDropdown taskId={taskId} />;
};

export default TasksTableActionsDropdown;
