# 🤝 Inter-Meet

A comprehensive, real-time interview and collaborative coding platform. Inter-Meet bridges the gap between video conferencing and technical assessments, allowing users to conduct interviews, solve algorithmic challenges in real-time, and practice coding independently.

---

## 🌐 Live Deployment
* **Live App:** [https://inter-meet.vercel.app/](https://inter-meet.vercel.app/)

---

## 🚀 Key Features
* **Video Conferencing:** High-quality video and audio meetings powered by GetStream.io.
* **Collaborative Coding:** Solve problems during meetings with a synchronized code editor.
* **In-Meeting Chat:** Real-time messaging functionality to communicate during active sessions.
* **Solo Practice Mode:** Dedicated section for users to practice coding problems independently without joining a meeting.
* **User Lifecycle Management:** Automated user creation, updates, and deletion handling via Webhooks (Clerk/Ingest).
* **Responsive Design:** Modern, dark-themed UI built with Tailwind CSS.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Video/Audio:** [GetStream.io](https://getstream.io/)
* **Styling:** Tailwind CSS
* **Authentication:** Clerk (with Webhook integration)
* **Icons:** Lucide React

### Backend & Database
* **Database:** MongoDB (via Mongoose)
* **User Management:** Automated Webhook Ingest for synchronized user profiles.
* **Deployment:** Vercel

---

## 📂 Project Structure



```text
├── src/
│   ├── components/       <-- Video, Chat, and Editor components
│   ├── hooks/            <-- Custom hooks for Stream and Auth
│   ├── pages/            <-- Meeting rooms, Practice area, Home
│   ├── api/              <-- MongoDB/Webhook connection logic
│   └── styles/           <-- Tailwind global configurations
└── public/               <-- Static assets
