import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/chat_page/index.jsx'
import AppLayout from './layout/app_layout/index.jsx'
import DocumentsPage from './pages/documents_page/index.jsx'
function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<div>Welcome to the App</div>} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Route>
    </Routes>
  )
}

export default App
