import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

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
import { sendMessage } from "../../api/chatapi";
import { uploadDocuments } from "../../api/documentapi";


const ChatPage = () => {

  const {
    messages,
    setMessages,
    selectedChat,
  } = useOutletContext();



  // const [messages, setMessages] = useState([]);
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
    fileInputRef.current?.click();
  };

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);

  //   if (!selectedFiles.length) return;

  //   const pdfFiles = [];
  //   const invalidFiles = [];

  //   selectedFiles.forEach((file) => {
  //     if (file.type === "application/pdf") {
  //       pdfFiles.push({
  //         id: crypto.randomUUID(),
  //         file,
  //         name: file.name,
  //         size: file.size,
  //       });
  //     } else {
  //       invalidFiles.push(file.name);
  //     }
  //   });

  //   if (invalidFiles.length) {
  //     alert(`Only PDF files are allowed.\n\n${invalidFiles.join("\n")}`);
  //   }

  //   setFiles((prev) => [...prev, ...pdfFiles]);

  //   // Allow selecting the same file again
  //   e.target.value = "";
  // };


//   const handleFileChange = async (e) => {
//   const files = Array.from(e.target.files || []);

//   if (!files.length) return;

//   const formData = new FormData();

//   files.forEach((file) => {
//     formData.append("files", file);
//   });

//   try {
//     setUploading(true);
//     setUploadProgress(0);

//     await uploadDocuments(formData, (progress) => {
//       setUploadProgress(progress);
//     });

//     await fetchDocuments();

//     fileInputRef.current.value = "";
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setUploading(false);
//     setUploadProgress(0);
//   }
// };

const handleFileChange = async (e) => {
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
              : file
          )
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
            : file
        )
      );
    } catch (error) {
      // ✅ Mark upload failed
      setUploadFiles((prev) =>
        prev.map((file) =>
          file.id === item.id
            ? {
                ...file,
              }
            : file
        )
      );
    }
  }
};

  const handleRemoveFile = (id) => {
  setUploadFiles((prev) =>
    prev.filter((file) => file.id !== id)
  );
};

  const handleSend = async (text) => {
    if (!text.trim() || loading || !selectedChat) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    // Show user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const { data } = await sendMessage(selectedChat, text);

      setMessages((prev) => [
        ...prev,
        data.message,
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);

      // Optional: remove optimistic user message if request fails
      setMessages((prev) =>
        prev.filter((message) => message.id !== userMessage.id)
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async (values) => {
    try {
      const { data } = await register(values);
      console.log("Signup response:", data);
      setIsSignupOpen(false);
      setIsLoginOpen(true)
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <ChatHeader
        title="Agentic RAG"
        actions={
          !isAuthenticated && (
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
          )
        }
      />

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
              <UploadPreview
                  files={uploadFiles}
                  onRemove={handleRemoveFile}
              />
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
