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
import { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import { addTask } from "../api";

function TaskCard() {
  const [date, setDate] = useState<Date>();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [notify, setNotify] = useState(false);

  const handleAddTask = async () => {
    if (!taskName || !description || !date) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const taskData = {
      title: taskName,
      description,
      dueDate: date.toISOString(),
      doNotify: notify,
    };

    try {
      const response = await addTask(taskData);

      if (response) {
        alert("Task added successfully!");
        setTaskName("");
        setDescription("");
        setDate(undefined);
        setNotify(false);
      } else {
        console.error("Failed to add task:", response.statusText);
        alert("Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("An error occurred while adding the task. Please try again.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center dark:bg-gray-800 dark:text-white">
      <div className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-600 dark:text-white ">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Add New Task
        </h2>

        {/* Task Name */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="taskName">Task Name</Label>
          <Input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Due Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full text-left font-normal flex items-center justify-between px-4 py-2",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Select Due Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black text-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Notify Me Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="notify"
            checked={notify}
            onCheckedChange={(checked) => setNotify(!!checked)}
          />
          <div className="flex flex-col">
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

        {/* Submit Button */}
        <Button
          type="button"
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default TaskCard;
