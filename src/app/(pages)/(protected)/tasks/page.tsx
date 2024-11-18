import { TasksContainer } from "@/components";
import { Button } from "@/components/ui/button";
import { urls } from "@/lib/urls";
import Link from "next/link";
import React from "react";

const Tasks = () => {
  return (
    <>
      <div>Tasks</div>
      <Button asChild>
        <Link href={urls.PUBLIC_TASKS_NEW}>Add Task</Link>
      </Button>
      <TasksContainer />
    </>
  );
};

export default Tasks;
