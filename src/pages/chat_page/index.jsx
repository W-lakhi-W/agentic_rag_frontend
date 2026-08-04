import { useState, useRef, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import ChatHeader from "../../components/chat_header";
import ChatMessages from "../../components/chat_messages";
import ChatInput from "../../components/chat_input";
import UploadPreview from "../../components/upload_preview";
import EmptyChat from "../../components/empty_chat";
import Tooltip from "../../components/tooltip";
import Button from "../../components/button";
import Modal from "../../components/modal";
import LoginForm from "../../components/login_form";
import SignupForm from "../../components/signup_form";
import { login as loginRequest, register } from "../../api/authapi";
import { useAuth } from "../../context/auth/AuthContext";
import { createChat, sendMessage } from "../../api/chatapi";
import { uploadDocuments } from "../../api/documentapi";

const ChatPage = () => {
  const { messages, setMessages, selectedChat, setSelectedChat, fetchChats } =
    useOutletContext();

  const location = useLocation();
  const selectedChatRef = useRef(selectedChat);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFiles, setUploadFiles] = useState([]);

  const { login: setAuthUser, isAuthenticated } = useAuth();

  const handleUpload = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to upload files");
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    if (!isAuthenticated) {
      toast.error("Please log in to upload files");
      return;
    }

    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const uploadItems = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
    }));

    setUploadFiles((prev) => [...prev, ...uploadItems]);

    for (const item of uploadItems) {
      const formData = new FormData();
      formData.append("files", item.file);

      try {
        await uploadDocuments(formData, (progress) => {
          // ✅ Update this file's progress
          setUploadFiles((prev) =>
            prev.map((file) =>
              file.id === item.id
                ? {
                    ...file,
                    progress,
                  }
                : file,
            ),
          );
        });

        // ✅ Mark upload complete
        setUploadFiles((prev) =>
          prev.map((file) =>
            file.id === item.id
              ? {
                  ...file,
                  progress: 100,
                }
              : file,
          ),
        );
      } catch (error) {
        // ✅ Mark upload failed
        setUploadFiles((prev) =>
          prev.map((file) =>
            file.id === item.id
              ? {
                  ...file,
                }
              : file,
          ),
        );
      }
    }
  };

  const handleRemoveFile = (id) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const normalizeMessage = (message) => {
    if (!message) return null;

    if (typeof message === "object") {
      return {
        id: message.id ?? crypto.randomUUID(),
        role: message.role ?? "assistant",
        content: message.content ?? "",
        createdAt: message.createdAt ?? new Date().toISOString(),
        sources: message.sources ?? [],
      };
    }

    return null;
  };

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    if (!isAuthenticated) {
      toast.error("Please log in to chat");
      return;
    }

    setUploadFiles([]);
    setFiles([]);
    fileInputRef.current.value = "";

    const activeChatId = selectedChatRef.current ?? selectedChat;
    const isNewChat =
      !activeChatId && messages.length === 0 && location.pathname === "/chats";

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      if (isNewChat) {
        const { data } = await createChat(text);
        // const responseData = data?.data ?? data;

        const createdChatId = data?.message?.chat_id;

        if (createdChatId) {
          selectedChatRef.current = createdChatId;
          setSelectedChat(createdChatId);
          await fetchChats?.();
        }

        const createdMessages = data?.chat_history ?? [];

        const normalizedReply = normalizeMessage(data?.message);

        if (Array.isArray(createdMessages) && createdMessages.length > 0) {
          setMessages(
            createdMessages
              .map((item) => normalizeMessage(item))
              .filter(Boolean),
          );
        } else if (normalizedReply) {
          setMessages((prev) => [...prev, normalizedReply]);
        }

        return;
      }

      const { data } = await sendMessage(activeChatId, text);
      const replyMessage = normalizeMessage(
        data?.message ?? data?.data?.message,
      );

      if (replyMessage) {
        setMessages((prev) => [...prev, replyMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      setMessages((prev) =>
        prev.filter((message) => message.id !== userMessage.id),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (values) => {
    try {
      const { data } = await loginRequest(values);
      setAuthUser(data.access_token, data.refresh_token, data.token_type);
      setIsLoginOpen(false);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSignUp = async (values) => {
    try {
      const { data } = await register(values);
      console.log("Signup response:", data);
      setIsSignupOpen(false);
      setIsLoginOpen(true);
      toast.success("Account created successfully. Please log in.");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {!isAuthenticated && (
        <ChatHeader
          title=""
          actions={
            <>
              <Button size="sm" onClick={() => setIsLoginOpen(true)}>
                Log in
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsSignupOpen(true)}
              >
                Sign up
              </Button>
            </>
          }
        />
      )}
      <ChatMessages
        messages={messages}
        loading={loading}
        emptyComponent={<EmptyChat />}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <UploadPreview
        files={files}
        onRemove={(id) =>
          setFiles((prev) => prev.filter((file) => file.id !== id))
        }
      />

      <div className="ml-4">
        {uploadFiles.length > 0 && (
          <UploadPreview files={uploadFiles} onRemove={handleRemoveFile} />
        )}
      </div>

      <ChatInput
        onSend={handleSend}
        loading={loading}
        onUpload={handleUpload}
      />

      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Log in"
      >
        <LoginForm onSubmit={handleLogin} />
      </Modal>

      <Modal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        title="Sign up"
      >
        <SignupForm onSubmit={handleSignUp} />
      </Modal>
    </div>
  );
};

export default ChatPage;
