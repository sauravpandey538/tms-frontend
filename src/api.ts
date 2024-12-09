interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  doNotify: boolean;
}

interface AddTaskResponse {
  message: string;
  task: any; // Replace with your task schema if available
}

export const addTask = async (taskData: TaskData): Promise<any | void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/add-task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(taskData),
      }
    );

    if (response.ok) {
      const data: AddTaskResponse = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to add task");
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

interface EditTaskData {
  id: string;
  title: string;
  description: string;
  dueDate: any;
  doNotify: boolean | undefined;
}

interface EditTaskResponse {
  message: string;
}

export const updateTask = async (
  taskData: EditTaskData
): Promise<any | void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/edit-task`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(taskData),
      }
    );

    if (response.ok) {
      const data: EditTaskResponse = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

interface DeleteTaskResponse {
  message: string;
}

export const deleteTask = async (taskId: string): Promise<any | void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/delete-task/${taskId}`,
      {
        method: "DELETE",
        headers: {},
        credentials: "include",
      }
    );

    if (response.ok) {
      const data: DeleteTaskResponse = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  doNotify: boolean;
}

interface GetTasksResponse {
  message: string;
  tasks: Task[];
}

export const getTasks = async (): Promise<any | void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/get-tasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data: GetTasksResponse = await response.json();
      console.log(data.tasks);
      return data.tasks;
    } else {
      throw new Error("Failed to fetch tasks");
    }
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
  }
};

interface EditDetails {
  newPassword: string;
  oldPassword: string;
  email: string;
}
export const updateDetails = async (
  details: EditDetails
): Promise<any | void> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/user/change-details`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(details),
      }
    );

    if (response.ok) {
      const data: EditTaskResponse = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
