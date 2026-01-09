# 🎬 MovieFlix - Netflix-Style Movie Review App

เว็บไซต์รีวิวหนังสไตล์ Netflix พัฒนาด้วย NestJS (Backend) และ React + TypeScript (Frontend)

## 🚀 Quick Start (แนะนำ - ใช้ Docker)

```bash
# รันทุกอย่างด้วยคำสั่งเดียว
docker-compose up -d

# สร้าง admin user
docker-compose exec backend npm run create:admin

# เข้าใช้งาน
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

📖 อ่านเพิ่มเติม: [DOCKER_SETUP_GUIDE.md](DOCKER_SETUP_GUIDE.md)

---

## 🌟 ฟีเจอร์หลัก

### Frontend
- ✅ ธีมสีแบบ Netflix
- ✅ Hero Section แสดงหนังเด่นประจำเดือน
- ✅ Movie Rows แบ่งตามประเภทหนัง (Genre)
- ✅ Navbar พร้อมปุ่ม Login/Logout และ Hamburger Menu
- ✅ Persistent Login (ล็อกอินครั้งเดียว รีเฟรชยังอยู่)
- ✅ คลิกที่โปสเตอร์/ชื่อหนังเพื่อเข้าหน้ารายละเอียด
- ✅ ระบบรีวิว: ให้คะแนนดาว 1-10 + เขียนความคิดเห็น (สามารถเลือกให้ดาวอย่างเดียวได้)

### Backend
- ✅ JWT Authentication
- ✅ RESTful APIs สำหรับ Movies, Genres, Reviews
- ✅ PostgreSQL Database
- ✅ TypeORM
- ✅ Role-based Access Control (Admin/User)


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

## 🎯 การใช้งาน

1. เปิดเว็บไซต์ จะเห็นหน้าแรกแสดงหนังเด่นและหนังแบ่งตามประเภท
2. กดที่ปุ่ม "เข้าสู่ระบบ" มุมบนขวา
3. Login ด้วย username: `user1`, password: `password123`
4. คลิกที่โปสเตอร์หนังเพื่อดูรายละเอียด
5. ในหน้ารายละเอียด สามารถให้คะแนนดาว และเขียนรีวิวได้
6. ใช้เมนู Hamburger เพื่อกรองหนังตามประเภท
7. Logout ได้จากปุ่มมุมบนขวา
