import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 px-5">
      <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-300">
        <div className="space-x-4">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
        </div>
        <p className="mt-4">© 2024 TaskMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
