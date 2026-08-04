import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
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
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-white h-screen p-5">
        <Sidebar
          sidebarItems={sidebarItems}
          chatHistory={chats}
          onDelete={handleDeleteRequest}
          viewChat={handleViewChat}
          onSelectNewChat={handleSelectNewChat}
          selectedChat={selectedChat}
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
          <div className="flex justify-end gap-3">
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
      <main className="flex-1 overflow-hidden">
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
