import { CalendarIcon } from "lucide-react";
import { cn } from "../components/lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import { getTasks, updateTask, deleteTask } from "../api"; // Update API functions
import { useAuth } from "../auth/auth-context";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  doNotify: boolean;
}

const TaskCardList: React.FC = () => {
  const { dueDateAfter1Day } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleUpdate = async (updatedTask: Task) => {
    console.log(updatedTask.dueDate);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const fetchTasks = async () => {
    const response = await getTasks();
    if (response) {
      const taskIdsToAlert = dueDateAfter1Day;
      console.log("alert ids are ", taskIdsToAlert);
      console.log("response ids are ", response);
      response.forEach((task: Task) => {
        if (taskIdsToAlert.includes(task.id.toString())) {
          console.log("matching meet");
          alert(`This task with id ${task.id} will be finished soon`);
        }
      });
      setTasks(response);
    } else {
      console.log("Error fetching tasks");
    }
  };

  const handleUpdateOnServer = async (updatedTask: Task) => {
    let task = updatedTask;
    const response = await updateTask(task!);
    if (!response) {
      console.error("Error updating task:", response.message);
    } else {
      alert("Task updated ");
      fetchTasks();
    }
  };

  const handleDelete = async (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));

    const response = await deleteTask(id);
    if (!response) {
      const deletedTask = tasks.find((task) => task.id === id);
      setTasks((prevTasks) => [...prevTasks, deletedTask!]);
      console.error("Error deleting task:", response.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className=" py-5 lg:py-16 flex flex-wrap gap-5 max-h-screen overflow-auto bg-gray-100 dark:bg-gray-800 justify-stretch flex-1 px-5">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-600 dark:text-white h-fit"
        >
          {/* Task Name */}
          <div className="flex items-start flex-col space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              type="text"
              id="taskName"
              value={task.title}
              onChange={(e) =>
                handleUpdate({
                  ...task,
                  title: e.target.value,
                })
              }
              placeholder="Enter task name"
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="flex items-start flex-col space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              value={task.description}
              onChange={(e) =>
                handleUpdate({
                  ...task,
                  description: e.target.value,
                })
              }
              placeholder="Enter task description"
              className="border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Due Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-start flex-col space-y-2">
                <Label htmlFor="description">Due Date</Label>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full text-left font-normal flex items-center justify-between px-4 py-2",
                    !task.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {task.dueDate ? (
                    format(task.dueDate, "PPP")
                  ) : (
                    <span>Select Due Date</span>
                  )}
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-black text-white">
              <Calendar
                mode="single"
                selected={new Date(task.dueDate!)}
                onSelect={(date) => handleUpdate({ ...task, dueDate: date! })}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Notify Me Checkbox */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="notify"
              checked={task.doNotify}
              onCheckedChange={(checked: boolean) =>
                handleUpdate({ ...task, doNotify: checked })
              }
            />
            <div className="flex flex-col items-start">
              <Label
                htmlFor="notify"
                className="text-sm font-medium text-gray-700 dark:text-white"
              >
                Notify me before 1 day
              </Label>
              <p className="text-sm text-gray-500 dark:text-white">
                You will be notified 1 day before the task's due date.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
              onClick={() => handleUpdateOnServer(task)}
            >
              Save Changes
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
              onClick={() => handleDelete(task.id)}
            >
              Delete Task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCardList;
