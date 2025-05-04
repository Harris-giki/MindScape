import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
              MS
            </span>
            <h1 className="ml-3 font-heading text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              MindScape
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
