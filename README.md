
# 💡 Innovation Tracker App

This is a full-stack web application for submitting, editing, liking, and commenting on innovation ideas.

---

## 🧩 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: SQLite (serverless)
- **API**: REST

---

## 📦 Features

- Submit and categorize innovation ideas
- Search and filter by keyword or category
- Edit and delete ideas
- Like toggle (⭐) with count
- Comment system with count
- Responsive UI (mobile-friendly)
- Horizontal scrollable category bar
- "Ask AI 🤖" external link button

---

## 🚀 Getting Started Locally

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/innovation-tracker.git
cd innovation-tracker
```

---

### ✅ 2. Start the Backend (FastAPI)

#### Step-by-step:

1. Make sure Python 3.9 or later is installed
2. (Optional) Create and activate a virtual environment:

```bash
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
```

3. Install required dependencies:

```bash
pip install fastapi uvicorn
```

4. Run the backend server (port 8000):

```bash
uvicorn main:app --reload --port 8000
```

> The backend will be available at: [http://localhost:8000](http://localhost:8000)

---

### ✅ 3. Start the Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev or npx vite  
```

> The frontend will be running at: [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment

### Frontend
- Vercel / Netlify (Vite supported)
- GitHub Pages (optional)

### Backend
- Render.com (FastAPI & SQLite friendly)
- Railway.app / Fly.io
- Or any VPS with Python 3.9+

---

## 📁 Project Structure

```
innovation-tracker/
│
├── backend/
│   └── main.py          # FastAPI backend
│   └── ideas.db         # SQLite DB
│
├── frontend/
│   └── App.jsx
│   └── IdeaList.jsx
│   └── main.jsx
│   └── index.html
│   └── styles.css
│
└── README.md
```