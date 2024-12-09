import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* T Letter */}
      <div
        className="text-4xl font-bold text-blue-600 transform rotate-12"
        style={{ letterSpacing: "-0.1em" }}
      >
        T
      </div>

      {/* M Letter */}
      <div
        className="text-4xl font-bold text-red-600 transform rotate-12"
        style={{ letterSpacing: "-0.1em" }}
      >
        M
      </div>
    </div>
  );
};

export default Logo;
