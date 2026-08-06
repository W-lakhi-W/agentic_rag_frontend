import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import Sidebar from "../../components/sidebar";
import { sidebarItems } from "../../components/sidebar/sidebardata";
import { demoChatHistory } from "../../components/sidebar/demochathistory";
import { useEffect, useState } from "react";
import { getChats, deleteChat, getMessages } from "../../api/chatapi";
import Modal from "../../components/modal";
import { useAuth } from "../../context/auth/AuthContext";

const AppLayout = () => {
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const sortChatsByNewest = (items = []) =>
    [...items].sort((a, b) => {
      const timeA = new Date(
        a?.updated_at ?? a?.updatedAt ?? a?.created_at ?? a?.createdAt ?? 0,
      ).getTime();
      const timeB = new Date(
        b?.updated_at ?? b?.updatedAt ?? b?.created_at ?? b?.createdAt ?? 0,
      ).getTime();

      return timeB - timeA;
    });

  const fetchChats = async () => {
    try {
      setLoadingChats(true);

      const { data } = await getChats();

      setChats(sortChatsByNewest(data?.chats ?? []));
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setLoadingChats(false);
    }
  };

  const handleDeleteRequest = (id) => {
    setDeleteChatId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteChatId || !isAuthenticated) return;

    try {
      await deleteChat(deleteChatId);

      setChats((prev) => prev.filter((chat) => chat.id !== deleteChatId));

      if (selectedChat === deleteChatId) {
        setSelectedChat(null);
        setMessages([]);
      }

      toast.success("Chat deleted successfully");
      setDeleteModalOpen(false);
      setDeleteChatId(null);
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast.error("Failed to delete chat");
    }
  };

  const handleViewChat = async (id) => {
    if (!isAuthenticated) return;

    try {
      setLoadingMessages(true);

      const { data } = await getMessages(id);

      setMessages(data.chat_history);
      setSelectedChat(id);
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchChats();
  }, [isAuthenticated]);

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="fixed left-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white shadow-sm md:hidden"
      >
        <Menu size={20} />
      </button>

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 h-dvh w-72 max-w-[85vw] border-r border-border bg-white p-4 transition-transform duration-200
          md:static md:w-64 md:max-w-none md:translate-x-0 md:p-5
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface md:hidden"
        >
          <X size={20} />
        </button>
        <Sidebar
          sidebarItems={sidebarItems}
          chatHistory={chats}
          onDelete={handleDeleteRequest}
          viewChat={handleViewChat}
          onSelectNewChat={handleSelectNewChat}
          selectedChat={selectedChat}
          onNavigate={() => setSidebarOpen(false)}
        />
      </aside>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeleteChatId(null);
        }}
        title="Delete chat?"
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setDeleteModalOpen(false);
                setDeleteChatId(null);
              }}
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text hover:bg-background"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        }
      >
        <p className="text-sm text-text-muted">
          This action cannot be undone. Are you sure you want to delete this
          chat?
        </p>
      </Modal>

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-hidden">
        <Outlet
          context={{
            messages,
            setMessages,
            selectedChat,
            setSelectedChat,
            fetchChats,
          }}
        />
      </main>
    </div>
  );
};

export default AppLayout;
