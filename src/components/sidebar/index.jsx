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
}) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setLogoutModalOpen(false);
    // window.location.reload();
  };

  const filterditems = sidebarItems.filter((item) => {
    if (item.auth && !isAuthenticated) {
      return false;
    }

    return true;
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Agentic RAG</h1>

      <nav className="space-y-2">
        {filterditems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            activeChatId={selectedChat}
            onClick={item.path === "/chats" ? onSelectNewChat : undefined}
          />
        ))}
      </nav>

      {isAuthenticated && (
        <>
          <h1 className="text-sm text-text-muted mt-2">Chat History</h1>
          <div className="mt-2">
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
        </>
      )}

      {isAuthenticated && (
        <>
          <div className="mt-6 border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
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
              <div className="flex justify-end gap-3">
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
    </>
  );
};

export default Sidebar;
