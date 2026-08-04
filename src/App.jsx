import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/chat_page/index.jsx";
import AppLayout from "./layout/app_layout/index.jsx";
import DocumentsPage from "./pages/documents_page/index.jsx";
import NotFound from "./pages/not_found/index.jsx";
import { useAuth } from "./context/auth/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/chats" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/chats" element={<ChatPage />} />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
