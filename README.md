# Lumina Lib 📚

Lumina Lib is a modern, AI-powered reading platform inspired by Wattpad. It offers a curated library of fiction, non-fiction, and educational books, with a personalized recommendation engine powered by Google's Gemini AI.

## ✨ Features

- **AI Librarian:** Personalized book recommendations based on your reading history, favorites, and search patterns.
- **Smart Catalog:** Explore a diverse collection of books with advanced filtering and search.
- **Personal Library:** Save your favorite books and track your reading progress.
- **AI Insights:** Get unique, AI-generated "Why Read This" summaries for every book.
- **Modern UI:** A clean, responsive design built with React, Tailwind CSS, and Framer Motion.
- **Secure Auth:** Google Authentication powered by Firebase.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Firebase Project
- A Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/lumina-lib.git
   cd lumina-lib
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (motion/react)
- **Backend/Database:** Firebase (Auth & Firestore)
- **AI Engine:** Google Gemini AI (@google/genai)
- **Icons:** Lucide React

## 📄 License

This project is licensed under the MIT License.
