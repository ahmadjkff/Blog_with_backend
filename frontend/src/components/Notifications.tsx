import { useEffect, useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router";
import { useBlog } from "../context/BlogContext";

interface INotification {
  _id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  blogId: string;
}

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useUser();
  const { blogs } = useBlog();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, [blogs]);

  const handleIsRead = async (id: string) => {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchNotifications();
  };

  const handleSelect = (blogId: string, notificationId: string) => {
    navigate(`/blog/${blogId}`);
    handleIsRead(notificationId);
  };

  useEffect(() => {
    setNewNotification(
      notifications.some((notification) => !notification.isRead)
    );
  }, [notifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      <IoIosNotifications
        size={25}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        fill={newNotification ? "red" : "black"}
      />

      {isOpen && (
        <ul className="absolute z-10 mt-1 mr-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              onClick={() =>
                handleSelect(notification.blogId, notification._id)
              }
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border p-2 flex flex-col"
            >
              <div className="flex justify-between items-center">
                {notification.message}
                <button onClick={() => handleIsRead(notification._id)}>
                  {notification.isRead ? (
                    <HiOutlineMailOpen size={20} />
                  ) : (
                    <MdOutlineMail size={20} />
                  )}
                </button>
              </div>

              <p className="text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
