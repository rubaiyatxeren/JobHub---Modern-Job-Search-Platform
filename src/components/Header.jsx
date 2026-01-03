import { Briefcase } from "lucide-react";
import React from "react";

const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase size={32} />
            <h1 className="text-3xl font-bold">JobHub</h1>
          </div>
          <nav className="flex gap-4">
            <button
              onClick={() => onNavigate("home")}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === "home"
                  ? "bg-white text-blue-600"
                  : "hover:bg-blue-500"
              }`}
              aria-current={currentPage === "home" ? "page" : undefined}
            >
              Jobs
            </button>

            <button
              onClick={() => onNavigate("saved")}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === "saved"
                  ? "bg-white text-blue-600"
                  : "hover:bg-blue-500"
              }`}
              aria-current={currentPage === "saved" ? "page" : undefined}
            >
              Saved
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
