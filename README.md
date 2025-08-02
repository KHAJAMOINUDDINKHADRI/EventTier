# EventTier

A modern event management platform that provides tiered access to events based on user membership levels. Built with Next.js, Clerk authentication, and Supabase.

## 🚀 Live Demo

**Deployed on Vercel:** [https://tier-event-seven.vercel.app](https://tier-event-seven.vercel.app/)

## ✨ Features

- **Tiered Event Access**: Different membership levels (Free, Silver, Gold, Platinum) with varying event access
- **Modern UI**: Beautiful with Tailwind CSS and Radix UI components
- **Authentication**: Secure user authentication with Clerk
- **Real-time Updates**: Event loading and tier-based filtering
- **Responsive Design**: Works seamlessly on desktop devices

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Authentication**: Clerk
- **Database**: Supabase
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project
- Clerk account and application

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/KHAJAMOINUDDINKHADRI/EventTier.git
cd tier-event
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/events
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/events
```

### 4. Database Setup

1. Create a new Supabase project
2. Create a events table with id, title, description, event_date, image_url, tier and created_at.
3. Configure your Supabase connection in `lib/supabase.ts`

### 5. Clerk Setup

1. Create a new Clerk application
2. Configure the authentication settings
3. Add your Clerk keys to the environment variables

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Demo User Credentials

### Platinum User

- **Email**: fedove1790@0tires.com
- **Password**: MoinK@12345
- **Access**: All events including exclusive CTO roundtables and premium workshops

### Gold User

- **Email**: benar96423@misehub.com
- **Password**: MoinK@12345
- **Access**: Gold-tier events, advanced workshops, and networking sessions

### Silver User

- **Email**: gadeyit851@efpaper.com
- **Password**: MoinK@12345
- **Access**: Silver-tier events and intermediate workshops

### Free User

- **Email**: natom47554@im5z.com
- **Password**: MoinK@12345
- **Access**: Community events and beginner workshops

## 🏆 Membership Tiers

| Tier         | Features                                       |
| ------------ | ---------------------------------------------- |
| **Free**     | Community events, beginner workshops           |
| **Silver**   | Intermediate workshops, networking events      |
| **Gold**     | Advanced workshops, exclusive networking       |
| **Platinum** | CTO roundtables, premium workshops, VIP access |

## 📝 License

This project is licensed under the MIT License.

---
