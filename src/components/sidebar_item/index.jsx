import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
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