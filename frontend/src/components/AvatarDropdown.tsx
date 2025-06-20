import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../context/userContext";

const AvatarDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, isAdmin } = useUser();

  const toggleDropdown = () => setOpen(!open);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <img
        src="https://i.pravatar.cc/40"
        alt="Avatar"
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
        onClick={toggleDropdown}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul className="py-2 text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to={"/profile"}>Profile</Link>
            </li>
            {isAdmin && (
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={"/add-blog"}>Add Blog</Link>
              </li>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to={"/my-blogs"}>My Blogs</Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
