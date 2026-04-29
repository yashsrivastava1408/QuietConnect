# Introvert Connect (TaskBoard OS)

A multi-page Next.js web application tailored for a low-pressure social and productivity experience. It combines task management (Kanban style), profile matching, messaging, and notifications into a beautifully designed, dark-themed interface with premium glassmorphic UI elements.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, v16.1.6)
- **UI Library:** [React](https://react.dev/) (v19)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with deep space themes, CSS variables, and glassmorphism properties.
- **Typography:** `next/font/google` (Inter)
- **Database/Persistence:** Local JSON file storage (`.data/app-state.json`) using Node.js `fs` module.
- **Authentication:** Custom session-based auth using Node.js native `crypto` (scrypt for hashing).

## 🛠 Architecture Workflow

The application operates as a monolithic Next.js app. The frontend communicates with Next.js API routes (or Server Actions), which in turn interact with a centralized data abstraction (`lib/db.ts`). This abstraction reads and writes synchronously to a local JSON file to simulate a database.

```mermaid
graph TD
    Client[Client Browser (React 19)]
    
    subgraph Next.js Server
        UI[Server Components / Pages]
        API[API Routes / Server Actions]
        DB_Layer[Database Abstraction - lib/db.ts]
        Crypto[Node.js Crypto - Hashing]
    end

    Storage[(Local JSON File: .data/app-state.json)]

    Client <-->|HTTP GET/POST| API
    Client <-->|RSC Payloads| UI
    
    API -->|Read/Write/Auth| DB_Layer
    UI -->|Read Initial State| DB_Layer
    
    DB_Layer -->|Scrypt Sync| Crypto
    DB_Layer <-->|fs.readFileSync / fs.writeFileSync| Storage
```

## ✨ Key Features & How They Work

### 1. File-Based Persistence (`lib/db.ts`)
Instead of a heavy external database, the app uses a simulated JSON database. On initialization, it checks for `.data/app-state.json`. If missing, it seeds initial data (users, tasks, messages, etc.). Every mutation (create task, send message, etc.) reads the JSON file into memory, updates the relevant arrays, and synchronously writes it back. 

### 2. Custom Authentication
Users register with an `@srmist.edu.in` email. Passwords are mathematically hashed using Node.js `scryptSync` with a random salt. On login, a random 24-byte hex token is generated and stored in the active `sessions` array inside the JSON database. This token is used to identify the current `UserSession`.

### 3. Task Management (Dashboard)
The dashboard operates like a Kanban board. Tasks have subtasks, priorities (`must`, `should`, `week`), and statuses (`todo`, `in-progress`, `completed`). Toggling a subtask automatically calculates and syncs the parent task's status via the `syncTaskStatus` utility. 

### 4. Matching & Friend Requests
Users can browse profiles, view interests, and save matches. They can also send and receive friend requests. The `friendRequests` array tracks the status (`pending`, `accepted`, `rejected`) and automatically triggers a new notification upon creation.

### 5. Premium Glassmorphic UI
The styling (`globals.css`) is completely custom, featuring:
- **Deep Space Mesh Gradients:** A dynamic background utilizing radial gradients.
- **Glassmorphism:** Panels and cards use `backdrop-filter: blur(16px)` combined with semi-transparent elevated background colors.
- **Dynamic Micro-Animations:** Hovering over buttons, task cards, and navigation links triggers smooth vertical lifts and glowing shadows for a premium interactive feel.

## 💻 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically create the `.data/app-state.json` file on the first run.
