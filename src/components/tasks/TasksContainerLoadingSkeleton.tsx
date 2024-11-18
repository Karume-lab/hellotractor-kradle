import React from "react";
import { Skeleton } from "../ui/skeleton";

const TasksContainerLoadingSkeleton = () => (
  <div>
    <TaskLoadingSkeleton />
    <TaskLoadingSkeleton />
    <TaskLoadingSkeleton />
  </div>
);

const TaskLoadingSkeleton = () => <Skeleton className="w-24 h-24"></Skeleton>;

export default TasksContainerLoadingSkeleton;
