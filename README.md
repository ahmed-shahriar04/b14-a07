# 🛒 BazarDor (বাজার দর) - Daily Commodity Price Tracker

A modern, responsive, and real-time commodity price tracking web application built to monitor daily market rates, price trends, and multi-market comparisons for everyday essential groceries across Bangladesh.

---

## 📌 Project Overview

**BazarDor** is designed to empower consumers and everyday buyers with reliable, transparent, and up-to-date market prices for daily essential commodities—including rice, lentils, oil, vegetables, fish, meat, and spices. With real-time price tracking, intuitive percentage changes, and comprehensive multi-market breakdowns, users can make well-informed shopping decisions every single day.

---

## 🚀 Key Features

1. **Real-Time Live Price Marquee (Ticker)**:
   - An infinite-scrolling marquee bar placed right below the navigation that provides live price updates and dynamic price trend badges (▲ price rise / ▼ price fall) for all essential commodities.

2. **Daily Market Analytics (Risers & Fallers)**:
   - Dedicated curated sections highlighting top daily market risers (**আজ দাম বেড়েছে ▲**) and top market fallers (**আজ দাম কমেছে ▼**) to help users quickly identify price fluctuations.

3. **Category Browsing & Smart Price Sorting**:
   - Dedicated category pages with interactive sorting options (Default, Price: Low to High, Price: High to Low) to easily explore categorized essentials.

4. **Protected Dynamic Product Details & Multi-Market Comparison**:
   - Secure route (`/product/[slug]`) requiring user authentication that displays comprehensive price summaries (Minimum, Maximum, Average) and detailed market-wise price comparisons across prominent wholesale and retail bazaars.

5. **Authentication & Profile Management**:
   - Secure authentication powered by Better Auth and MongoDB Atlas supporting Email/Password, Google, and GitHub social sign-in, along with a personalized user profile management dashboard.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Icons**: [FontAwesome 6](https://fontawesome.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Typography & Localization**: Google Fonts (Hind Siliguri, Noto Sans Bengali, Inter)

---

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js (v18.18 or later) installed on your system.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmed-shahriar04/b14-a07
   cd b14-a07
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   BETTER_AUTH_SECRET=your_better_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌐 Live Demo & Repository

- **Live Deployment**: 
- **GitHub Repository**: https://github.com/ahmed-shahriar04/b14-a07
