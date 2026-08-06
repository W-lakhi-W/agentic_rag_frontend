import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import SidebarItem from "../sidebar_item";
import ChatHistoryItem from "../chat_history_item";
import Modal from "../modal";
import { useAuth } from "../../context/auth/AuthContext";
import { sidebarItems } from "./sidebardata";

const Sidebar = ({
  sidebarItems: items = [],
  chatHistory: history = [],
  onDelete,
  viewChat,
  onSelectNewChat,
  selectedChat,
  onNavigate,
}) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setLogoutModalOpen(false);
    window.location.reload();
  };

  const filterditems = sidebarItems.filter((item) => {
    if (item.auth && !isAuthenticated) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-6 flex items-center gap-3 pr-12 md:mb-8 md:pr-0">
        <img
          src="/logo.png"
          alt="Agent logo"
          className="h-10 w-auto object-contain"
        />
        <span className="text-xl font-semibold tracking-tight text-black-600">
          Agent
        </span>
      </div>

      <nav className="space-y-2">
        {filterditems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeChatId={selectedChat}
            onClick={(clickedItem) => {
              if (clickedItem.path === "/chats") onSelectNewChat?.();
              onNavigate?.();
            }}
          />
        ))}
      </nav>

      {isAuthenticated && (
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          <h1 className="text-sm text-text-muted mt-2">Chat History</h1>
          <div className="mt-2 min-h-0 overflow-y-auto pr-1">
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((chat) => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    active={selectedChat === chat.id}
                    onDelete={() => {
                      onDelete?.(chat.id);
                    }}
                    onClick={() => {
                      navigate("/chats");
                      viewChat(chat.id);
                      onNavigate?.();
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border border-border py-2">
                <p className="text-sm text-text-muted">No chat history</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isAuthenticated && (
        <>
          <div className="mt-6 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          <Modal
            isOpen={logoutModalOpen}
            onClose={() => setLogoutModalOpen(false)}
            title="Log out?"
            footer={
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setLogoutModalOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text hover:bg-background"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Log out
                </button>
              </div>
            }
          >
            <p className="text-sm text-text-muted">
              Are you sure you want to log out of your account?
            </p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Sidebar;
