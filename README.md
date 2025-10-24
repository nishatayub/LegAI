# LegAI

LegAI is a web application that helps users understand and interact with legal documents using an AI-powered chatbot. Users can upload legal documents (PDF/Text) and chat with an AI that explains, summarizes, and answers questions about the content in plain language.

---

## 🚀 Features

- **AI Chatbot:** Ask questions about legal documents and receive plain-language answers.
- **Document Upload:** Upload PDF or text files for analysis.
- **Context-Aware Replies:** The AI uses document context for accurate responses.
- **Summaries & Explanations:** Get structured summaries of clauses, definitions, and obligations.
- **User-Friendly Interface:** Simple chat UI with conversation history.

---

## 🛠️ Tech Stack

- **Frontend:** Vite + React (JavaScript)
- **Backend:** NodeJs + ExpressJs
- **Database:** MongoDB
- **AI Integration:** API-based (Gemini API)
- **Text Parsing:** Client-side extraction

---

## 📦 Installation

### Frontend (Client)

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit `http://localhost:5173` (or as indicated in the terminal).

### Backend (Server)

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   node index.js
   ```
   (Adjust the command as needed for your backend setup.)

---

## 🧑‍💻 Usage

1. Upload a legal document (PDF or text).
2. Ask questions or request summaries in the chat interface.
3. Review AI-generated explanations and document breakdowns.

---

## 📋 Project Roadmap

**Phase 1 — Core Setup**
- Minimal chat interface
- AI API integration
- Basic conversation memory

**Phase 2 — Document Understanding**
- File upload & parsing
- Context-aware AI replies
- Structured summaries

**Phase 3 — Experience & Refinement**
- UI/UX improvements
- Error handling & session persistence
- Enhanced legal interpretation

---