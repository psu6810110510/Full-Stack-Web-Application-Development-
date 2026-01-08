# 🎬 MovieFlix - Netflix-Style Movie Review App

เว็บไซต์รีวิวหนังสไตล์ Netflix พัฒนาด้วย NestJS (Backend) และ React + TypeScript (Frontend)

## 🌟 ฟีเจอร์หลัก

### Frontend
- ✅ ธีมสีแบบ Netflix (#141414, #E50914)
- ✅ Hero Section แสดงหนังเด่นประจำเดือน
- ✅ Movie Rows แบ่งตามประเภทหนัง (Genre)
- ✅ Navbar พร้อมปุ่ม Login/Logout และ Hamburger Menu
- ✅ Persistent Login (ล็อกอินครั้งเดียว รีเฟรชยังอยู่)
- ✅ คลิกที่โปสเตอร์/ชื่อหนังเพื่อเข้าหน้ารายละเอียด
- ✅ ระบบรีวิว: ให้คะแนนดาว 1-10 + เขียนความคิดเห็น

### Backend
- ✅ JWT Authentication
- ✅ RESTful APIs สำหรับ Movies, Genres, Reviews
- ✅ PostgreSQL Database
- ✅ TypeORM
- ✅ Role-based Access Control (Admin/User)

## 🚀 วิธีการรัน

### 1️⃣ เตรียม Database
```bash
cd backend
docker-compose up -d
```

### 2️⃣ Seed ข้อมูลหนังตัวอย่าง
```bash
cd backend
npm install
npx ts-node src/seed.ts
```

### 3️⃣ รัน Backend
```bash
cd backend
npm run start:dev
```
Backend จะรันที่ http://localhost:3000

### 4️⃣ รัน Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend จะรันที่ http://localhost:5173

## 🔐 ข้อมูลทดสอบ

**User Account:**
- Username: `user1`
- Password: `password123`

**Admin Account:**
- Username: `admin`
- Password: `password123`

## 📁 โครงสร้างโปรเจกต์

```
mini-project/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication
│   │   ├── movies/        # Movies API
│   │   ├── genres/        # Genres API
│   │   ├── reviews/       # Reviews API
│   │   ├── users/         # Users Management
│   │   ├── seed.ts        # Seed data script
│   │   └── main.ts
│   └── docker-compose.yml
│
└── frontend/
    ├── src/
    │   ├── components/    # Navbar, Hero, MovieRow
    │   ├── pages/         # Home, MovieDetail, Login
    │   ├── context/       # AuthContext
    │   └── App.tsx
    └── package.json
```

## 🎨 ธีมสี Netflix

- Background: `#141414`
- Primary (Netflix Red): `#E50914`
- Text: `#ffffff`
- Secondary: `#8c8c8c`
- Card Background: `#222222`

## 🛠️ เทคโนโลยีที่ใช้

**Backend:**
- NestJS 11
- TypeORM
- PostgreSQL
- JWT & Passport
- bcrypt

**Frontend:**
- React 19
- TypeScript
- React Router DOM
- Vite

## 📝 API Endpoints

### Authentication
- POST `/auth/login` - เข้าสู่ระบบ

### Movies
- GET `/movies` - ดูหนังทั้งหมด
- GET `/movies?genreId=1` - กรองตาม Genre
- GET `/movies/featured` - หนังเด่นประจำเดือน
- GET `/movies/:id` - รายละเอียดหนัง

### Genres
- GET `/genres` - ดู Genres ทั้งหมด

### Reviews
- GET `/reviews/movie/:movieId` - ดูรีวิวของหนัง
- POST `/reviews` - สร้างรีวิว (ต้อง Login)

## 🎯 การใช้งาน

1. เปิดเว็บไซต์ จะเห็นหน้าแรกแสดงหนังเด่นและหนังแบ่งตามประเภท
2. กดที่ปุ่ม "เข้าสู่ระบบ" มุมบนขวา
3. Login ด้วย username: `user1`, password: `password123`
4. คลิกที่โปสเตอร์หนังเพื่อดูรายละเอียด
5. ในหน้ารายละเอียด สามารถให้คะแนนดาว และเขียนรีวิวได้
6. ใช้เมนู Hamburger เพื่อกรองหนังตามประเภท
7. Logout ได้จากปุ่มมุมบนขวา
