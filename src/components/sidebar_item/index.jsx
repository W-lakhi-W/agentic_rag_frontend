import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ item, activeChatId, onClick }) => {
  const Icon = item.icon;
  const location = useLocation();

  const isChatRoute = item.path === "/chats";
  const isActive = isChatRoute
    ? location.pathname === item.path && !activeChatId
    : location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      onClick={() => {
        if (isChatRoute) onClick?.();
      }}
      className={() =>
        `
        flex items-center gap-3
        px-4 py-3
        rounded-lg
        transition
        ${
          isActive
            ? "bg-yellow-400 text-black"
            : "text-gray-500 hover:bg-gray-100"
        }
      `
      }
    >
      <Icon size={20} />
      <span>{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;
