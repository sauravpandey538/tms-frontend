import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <div>
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Manage Your Tasks Efficiently
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Organize, track, and prioritize tasks in one place.
        </p>
        <div className="mt-6">
          <a
            href="/signup"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
