import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      title: "Task Management",
      description: "Create and manage your tasks with ease.",
    },
    {
      title: "Search & Filter",
      description: "Easily search for tasks and filter by status or priority.",
    },
    {
      title: "Overdue Notifications",
      description:
        "Get notified when tasks are overdue so that you wont miss your task.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="text-center border">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Core Features
        </h2>
        <div className="flex justify-center my-14 flex-wrap gap-5 px-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
