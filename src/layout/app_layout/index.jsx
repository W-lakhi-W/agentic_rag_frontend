import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { sidebarItems } from "../../components/sidebar/sidebardata";
import { demoChatHistory } from "../../components/sidebar/demochathistory";
import { useEffect, useState } from "react";
import { getChats, deleteChat, getMessages } from "../../api/chatapi";

const AppLayout = () => {
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchChats = async () => {
    try {
      setLoadingChats(true);

      const { data } = await getChats();

      setChats(data.chats);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setLoadingChats(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteChat(id);

      setChats((prev) => prev.filter((chat) => chat.id !== id));

      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleViewChat = async (id) => {
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
    fetchChats();
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-white h-screen p-5">
        <Sidebar
          sidebarItems={sidebarItems}
          chatHistory={chats}
          onDelete={handleDelete}
          viewChat={handleViewChat}
          onSelectNewChat={handleSelectNewChat}
          selectedChat={selectedChat}
        />
      </aside>

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
