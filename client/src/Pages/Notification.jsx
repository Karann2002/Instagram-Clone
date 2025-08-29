import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket"; // your socket instance
import { useUser } from "../Context/UserContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Notification = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("register", user._id);

    const handleNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    socket.on("getNotification", handleNotification);

    return () => {
      socket.off("getNotification", handleNotification);
    };
  }, [user?._id]);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    if (!open) setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button className="relative" onClick={toggleDropdown}>
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl p-2 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div
                key={i}
                onClick={() => {
                  if (n.type === "like" || n.type === "comment") {
                    navigate(`/post/${n.post}`);
                  } else if (n.type === "follow") {
                    navigate(`/profile/${n.sender}`);
                  } else if (n.type === "message") {
                    navigate(`/chat/${n.sender}`);
                  }
                }}
                className="cursor-pointer flex items-start gap-2 p-2 border-b last:border-0 hover:bg-gray-100 text-sm"
              >
                {n.senderPic && (
                  <img
                    src={n.senderPic}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  {n.type === "like" && (
                    <p><strong>{n.senderName}</strong> liked your post</p>
                  )}
                  {n.type === "comment" && (
                    <p><strong>{n.senderName}</strong> commented: "{n.text}"</p>
                  )}
                  {n.type === "follow" && (
                    <p><strong>{n.senderName}</strong> started following you</p>
                  )}
                  {n.type === "message" && (
                    <p><strong>{n.senderName}</strong> sent you a message: "{n.text}"</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {dayjs(n.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
