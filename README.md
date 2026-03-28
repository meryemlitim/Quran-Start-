# 🌙 Quran Start

> Plateforme Web d'Apprentissage du Coran pour Enfants

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![NestJS](https://img.shields.io/badge/Backend-NestJS-red)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_16-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)

---

## 🔗 Quick Links

| | Link |
|---|---|
| 🚀 **Frontend** | [[https://quran-start-fsk4.onrender.com]](https://quran-start-5977.onrender.com)(https://quran-start-5977.onrender.com) |
| ⚙️ **Backend API** | [https://quran-start-1.onrender.com](https://quran-start-1.onrender.com) |
| 🎨 **Figma Design** | [View Design](https://www.figma.com/design/dyycUIgDNtp1a2F21SbouJ/CORAN-START?node-id=0-1&t=NpbiaL4L1dTBsUv6-1) |

---

## 📖 About the Project

Quran Start is an educational web platform designed for children who want to discover and learn the Quran in a simple, fun and interactive way. The platform is based on listening, repetition,educational monitoring by parents.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + Tailwind CSS + TypeScript |
| Backend | NestJS + TypeScript |
| Database | MongoDB Atlas |
| Authentication | JWT + Passport.js + js-cookie |
| Audio | Islamic Network CDN + mp3quran.net |
| Quran API | api.alquran.cloud + api.qurani.ai |
| Deployment | Render.com |

---

## 👥 User Roles

### 👨‍👩‍👦 Parent
- Register an account with child information
- Login and access the parent dashboard
- View child progress (current hizb, sorat, aya)
- View child achievements and earned stars
- Monitor learning activity

### 🧒 Child
- Access the learning dashboard (via parent account)
- Browse the list of hizbs (locked / unlocked)
- Click on a hizb to see its sorats
- Complete the **Reading** step: listen to the full sorat 5 times
- Complete the **Memorizing** step: repeat aya by aya (10 times each)
- Unlock the next Surah after successfully completing the previous one.
- Earn stars based on quiz score
- Track personal progress

### 🛡️ Admin
- Login to the admin dashboard
- Manage user accounts
- View global statistics

---

## 📚 Learning Flow

```
Parent creates account + child info
        ↓
Progress record auto-created (Hizb 1, Sorat 1, Step: reading)
        ↓
Child browses hizbs → clicks Hizb 1 → sees sorats
        ↓
READING STEP
  Child listens to full sorat × 5 times
        ↓
MEMORIZING STEP
  Aya 1 appears → child repeats × 10
  Aya 1 + Aya 2 appear → child repeats × 10
  ... continues until last aya
        ↓
PASS → next sorat unlocked ✅
        ↓
Complete all sorats in hizb → next hizb unlocked 🎉
```

---

## 📁 Project Structure

### Backend (NestJS)
```
src/
├── auth/          ← JWT authentication
├── users/         ← Parent & admin schema
├── progress/      ← Learning progress tracking
├── quran/         ← Quran content (hizbs, sorats, ayats)
└── main.ts
```

### Frontend (Next.js)
```
app/
├── (auth)/
│   ├── login/               ← Login page
│   └── register/            ← Register page
├── dashboard/               ← Child dashboard
├── parent/                  ← Parent space
├── admin/                   ← Admin dashboard
└── learning/[sorat]/[name]/
    ├── page.tsx             ← Reading step
    └── memorizing/          ← Memorizing step
```

---

## ⚙️ Environment Setup

### Backend `.env`
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Run Backend
```bash
cd backend
npm install
npm run start:dev
```

### Run Frontend
```bash
cd frontend
npm install
npm run dev -- -p 3001
```

### Seed Admin Account
```bash
npm run seed:admin
# Email: admin@quranstart.com
# Password: admin123
```

---

## 📡 Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Parent registration |
| POST | `/auth/login` | Login (parent / admin) |
| GET | `/auth/me` | Get current user profile |
| GET | `/progress/me` | Get child progress |
| PATCH | `/progress/step` | Update learning step |
| PATCH | `/progress/aya` | Increment current aya |
| PATCH | `/progress/quiz-result` | Submit quiz score |
| GET | `/quran/hizbs` | Get all hizbs |
| GET | `/quran/sorats/:hizb` | Get sorats by hizb |
| GET | `/quran/ayats/:sorat` | Get ayats by sorat |

---

## 📊 Progress Schema

```typescript
{
  userId: ObjectId,
  currentHizb: number,      // default: 60
  currentSorat: number,     // default: 87
  currentAya: number,       // default: 1
  step: 'reading' | 'memorizing',
  unlockedHizbs: number[],  // default: [60]
  unlockedSorats: number[], // default: [87]
  completedSorats: number[],
  stars: number,
}
```

---

## 🌙 Credits

- Quran text & audio: [AlQuran Cloud API](https://alquran.cloud)
- Hizb metadata: [Qurani AI API](https://api.qurani.ai)
- Reciter: Mishary Rashid Alafasy

---

© 2024 Quran Start. All rights reserved.
