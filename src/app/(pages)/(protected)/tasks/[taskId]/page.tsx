import { Button } from "@/components/ui/button";
import { urls } from "@/lib/urls";
import { getTask } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface TaskPageProps {
  params: { taskId: string };
}
const TaskPage: React.FC<TaskPageProps> = async ({ params: { taskId } }) => {
  const task = await getTask(taskId);
  return (
    <>
      <div>Task</div>
      <h1>{task?.title}</h1>
      <Button variant={"link"} asChild>
        <Link href={urls.PUBLIC_TASKS}>Go to tasks</Link>
      </Button>
    </>
  );
};

export default TaskPage;
