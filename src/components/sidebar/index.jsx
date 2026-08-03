import SidebarItem from "../sidebar_item";
import ChatHistoryItem from "../chat_history_item";
import { useAuth } from "../../context/auth/AuthContext";
import { sidebarItems } from "./sidebardata";

const Sidebar = ({ sidebarItems: items = [],chatHistory: history = [], onDelete, viewChat }) => {
  const { isAuthenticated } = useAuth();

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
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>
      
      {isAuthenticated && <>
      <h1 className="text-sm text-text-muted mt-2">Chat History</h1>
      <div className="mt-2">
        {history.length > 0 ? (
          <div className="space-y-2">
            {history.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                onDelete={() => {onDelete(chat.id)}}
                onClick={() => {viewChat(chat.id)}}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-border py-2">
            <p className="text-sm text-text-muted">
              No chat history
            </p>
          </div>
        )}
      </div>
      </>
      }
    </>
  );
};

export default Sidebar;
