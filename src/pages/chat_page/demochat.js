const chat = [
  {
    id: 1,
    role: "assistant",
    content:
      "👋 Hi! I'm your AI assistant. Upload a document or ask me any question.",
    createdAt: "10:00 AM",
  },

  {
    id: 2,
    role: "user",
    content: "What is React?",
    createdAt: "10:01 AM",
  },

  {
    id: 3,
    role: "assistant",
    content:
      "React is a JavaScript library for building user interfaces. It allows developers to create reusable components and efficiently update the UI using a virtual DOM.",
    createdAt: "10:01 AM",
    sources: [
      "React Documentation.pdf",
      "Frontend Notes.pdf",
    ],
  },

  {
    id: 4,
    role: "user",
    content: "Write a simple React component.",
    createdAt: "10:02 AM",
  },

  {
    id: 5,
    role: "assistant",
    content: `function Welcome() {
  return <h1>Hello World</h1>;
}

export default Welcome;`,
    createdAt: "10:02 AM",
    isCode: true,
  },

  {
    id: 6,
    role: "user",
    content:
      "Can you summarize the uploaded PDF?",
    createdAt: "10:03 AM",
  },

  {
    id: 7,
    role: "assistant",
    content:
      "Here is the summary:\n\n• React is component-based.\n• JSX allows writing HTML inside JavaScript.\n• State manages dynamic data.\n• Props pass data between components.\n• Hooks simplify state management.",
    createdAt: "10:03 AM",
    sources: [
      "React Guide.pdf",
    ],
  },
]

export default chat;