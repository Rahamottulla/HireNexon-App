# HireNexon 🚀

HireNexon is a next-generation hiring platform that connects **job seekers**, **companies**, and **universities** on a single unified platform to simplify hiring, learning, and career growth.

Unlike traditional job portals, HireNexon is designed as an ecosystem that bridges recruitment, skill development, and institutional collaboration.

---

## 🌍 Why HireNexon?

Current hiring platforms focus only on job listings. Universities remain disconnected, candidates lack guided career growth, and companies struggle with quality talent discovery.

**HireNexon solves this by:**
- Connecting candidates, companies, and universities in one system
- Enabling smarter hiring and talent discovery
- Supporting career development beyond just jobs
- Creating a scalable, future-ready hiring ecosystem

---

## 🏗️ Architecture Overview

HireNexon follows a **feature-first (domain-driven) architecture**, inspired by enterprise-scale applications.

- Clear separation of business domains
- Scalable for multi-team development
- Easy to maintain and extend
- Frontend and backend remain independent but coordinated

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Tooling & Infrastructure
- Git & GitHub
- Environment-based configuration
- REST APIs

---

## 📂 Folder Structure
src/
├── app/ # Application wiring (routes, providers)
│ ├── App.jsx
│ ├── Providers.jsx
│ └── routes.jsx
│
├── features/ # Business domains
│ ├── candidate/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── hooks/
│ │
│ ├── company/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── hooks/
│ │
│ ├── university/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── hooks/
│ │
│ ├── auth/
│ │ ├── pages/
│ │ ├── services/
│ │ └── hooks/
│ │
│ └── email/
│ ├── pages/
│ └── services/
│
├── shared/ # Reusable across all features
│ ├── components/
│ ├── hooks/
│ └── utils/
│
├── layouts/ # Layout components only
│ ├── AuthLayout.jsx
│ ├── HomeLayout.jsx
│ └── CandidateLayout.jsx
│
├── assets/
└── styles/

---

## 👥 Platform Roles

### 👤 Candidate
- Browse and apply for jobs
- Track applications and interviews
- Access career resources and roadmaps
- Connect with companies and communities

### 🏢 Company
- Post jobs and internships
- Manage applicants and interviews
- Discover talent efficiently
- Collaborate with universities

### 🎓 University
- Support students’ career growth
- Connect with hiring companies
- Bridge education with employment
- Enable institutional collaboration

---

## ▶️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm
- MongoDB (local or cloud)

---

### Setup
### Backend setup
```bash
cd backend
npm install
npm run dev

---

### 🖥️ Frontend Setup
```bash
cd frontend
npm install
npm run dev

---

###🔐Environment Variables
Create .env files based on .env.example.

Backend (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

Frontend (frontend/.env)
VITE_BACKEND_URL=https://hirenexon-app.onrender.com

⚠️ Important:
.env files are intentionally ignored from version control for security reasons.

---

### 🚧 Project Status

HireNexon is currently under active development.

New features, performance optimizations, and scalability improvements are continuously being added as the platform evolves.

---

###👨‍💻 Author & Founder

**Rahamottulla Haque Mondal**  
Founder & Developer — HireNexon  
Computer Science Student  
India 🇮🇳

---

###📄 License

This project is currently private and proprietary.
Licensing details will be added in the future.

---

HireNexon — Where Talent Meets Opportunity.***

