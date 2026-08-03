import { FileText, MessageSquare } from "lucide-react";

export const sidebarItems = [
  {
    id: 1,
    title: "Chat",
    icon: MessageSquare,
    path: "/chats",
    auth: false,
  },
  {
    id: 2,
    title: "Documents",
    icon: FileText,
    path: "/documents",
    auth: true,
  },
];
