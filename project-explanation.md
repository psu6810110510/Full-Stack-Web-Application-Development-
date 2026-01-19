# 🎬 MovieFlix - คำอธิบายโปรเจกต์โดยละเอียด

## 📋 ข้อมูลทั่วไป

**ชื่อโปรเจกต์:** MovieFlix  
**ประเภท:** เว็บแอปพลิเคชันรีวิวหนังออนไลน์  
**ผู้พัฒนา:**
- นายศิรสิทธิ์ ศุภสาร (6810110510)
- นางสาวนิ-นฎา นิเดร์หะ (6810110628)

**วันที่สร้าง:** พ.ศ. 2569  
**สถานะ:** เสร็จสมบูรณ์และพร้อมใช้งาน

---

## 🎯 วัตถุประสงค์ของโปรเจกต์

MovieFlix เป็นแพลตฟอร์มเว็บแอปพลิเคชันสำหรับรีวิวและค้นหาข้อมูลภาพยนตร์ ออกแบบมาให้มีประสบการณ์การใช้งานที่คล้ายกับ Netflix โดยมุ่งเน้นให้ผู้ใช้งานสามารถ:
- ค้นหาและเรียกดูข้อมูลภาพยนตร์ที่หลากหลาย
- แบ่งหมวดหมู่ภาพยนตร์ตามประเภท (Genre)
- ให้คะแนนและเขียนรีวิวภาพยนตร์ที่ชื่นชอบ
- จัดการข้อมูลภาพยนตร์ (สำหรับผู้ดูแลระบบ)
- มีระบบการยืนยันตัวตนที่ปลอดภัย

---

## 🏗️ สถาปัตยกรรมของระบบ (System Architecture)

โปรเจกต์นี้พัฒนาด้วยสถาปัตยกรรมแบบ **Client-Server** แยกเป็น 2 ส่วนหลัก:

### 1. Backend (Server-Side)
- **Framework:** NestJS (Node.js Framework ที่ใช้ TypeScript)
- **ฐานข้อมูล:** PostgreSQL
- **ORM:** TypeORM (Object-Relational Mapping)
- **Authentication:** JWT (JSON Web Tokens)
- **Port:** 3000

### 2. Frontend (Client-Side)
- **Library:** React 18 พร้อม TypeScript
- **Build Tool:** Vite
- **Styling:** CSS แบบ Modular
- **State Management:** React Context API (AuthContext)
- **HTTP Client:** Fetch API
- **Port:** 5173

### 3. Infrastructure
- **Containerization:** Docker & Docker Compose
- **Web Server:** Nginx (สำหรับ Production)
- **Deployment:** Ready for Docker-based deployment

---

## 📦 โครงสร้างโปรเจกต์โดยละเอียด

```
mini-project/
│
├── backend/                          # โฟลเดอร์ Backend (NestJS)
│   ├── docker-compose.yml           # Docker configuration สำหรับ PostgreSQL
│   ├── Dockerfile                   # Docker image สำหรับ Backend
│   ├── package.json                 # Dependencies และ scripts
│   ├── tsconfig.json                # TypeScript configuration
│   │
│   └── src/                         # Source code หลัก
│       ├── main.ts                  # Entry point ของแอปพลิเคชัน
│       ├── app.module.ts            # Root module
│       ├── seed.ts                  # Script สำหรับใส่ข้อมูลตัวอย่าง
│       ├── create-admin.ts          # Script สร้าง Admin user
│       │
│       ├── auth/                    # โมดูลระบบยืนยันตัวตน
│       │   ├── auth.controller.ts   # API endpoints: /auth/login, /auth/register
│       │   ├── auth.service.ts      # Business logic สำหรับ Authentication
│       │   ├── auth.module.ts       # Module configuration
│       │   ├── jwt.strategy.ts      # JWT validation strategy
│       │   ├── jwt-auth.guard.ts    # Guard สำหรับป้องกัน routes
│       │   ├── roles.guard.ts       # Guard ตรวจสอบ Role (Admin/User)
│       │   └── roles.decorator.ts   # Decorator สำหรับกำหนด Role
│       │
│       ├── movies/                  # โมดูลจัดการภาพยนตร์
│       │   ├── movie.entity.ts      # Entity (Database Schema)
│       │   ├── movies.controller.ts # API endpoints สำหรับ CRUD movies
│       │   ├── movies.service.ts    # Business logic สำหรับ Movies
│       │   ├── movies.module.ts     # Module configuration
│       │   └── dto/                 # Data Transfer Objects
│       │       └── create-movie.dto.ts
│       │
│       ├── genres/                  # โมดูลจัดการประเภทภาพยนตร์
│       │   ├── genre.entity.ts      # Entity (Database Schema)
│       │   ├── genres.controller.ts # API endpoints สำหรับ genres
│       │   ├── genres.service.ts    # Business logic สำหรับ Genres
│       │   └── genres.module.ts     # Module configuration
│       │
│       ├── reviews/                 # โมดูลจัดการรีวิว
│       │   ├── review.entity.ts     # Entity (Database Schema)
│       │   ├── reviews.controller.ts # API endpoints สำหรับ reviews
│       │   ├── reviews.service.ts   # Business logic สำหรับ Reviews
│       │   ├── reviews.module.ts    # Module configuration
│       │   └── dto/                 # Data Transfer Objects
│       │       └── create-review.dto.ts
│       │
│       └── users/                   # โมดูลจัดการผู้ใช้งาน
│           ├── user.controller.ts   # API endpoints สำหรับ users
│           ├── users.service.ts     # Business logic สำหรับ Users
│           ├── users.module.ts      # Module configuration
│           ├── user-role.enum.ts    # Enum กำหนด Role (ADMIN, USER)
│           └── entities/
│               └── user.entity.ts   # Entity (Database Schema)
│
├── frontend/                        # โฟลเดอร์ Frontend (React + TypeScript)
│   ├── Dockerfile                   # Docker image สำหรับ Frontend
│   ├── nginx.conf                   # Nginx configuration
│   ├── package.json                 # Dependencies และ scripts
│   ├── vite.config.ts               # Vite configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── index.html                   # HTML template
│   │
│   ├── public/                      # Static assets
│   │
│   └── src/                         # Source code หลัก
│       ├── main.tsx                 # Entry point
│       ├── App.tsx                  # Root component พร้อม routing
│       ├── App.css                  # Global styles
│       ├── index.css                # Base styles
│       ├── config.ts                # Configuration (API URL)
│       ├── types.ts                 # TypeScript type definitions
│       ├── interfaces.ts            # TypeScript interfaces
│       │
│       ├── components/              # Reusable components
│       │   ├── Navbar.tsx           # แถบเมนูด้านบน
│       │   ├── Navbar.css
│       │   ├── HeroSection.tsx      # ส่วนแสดงหนังเด่น
│       │   ├── HeroSection.css
│       │   ├── MovieRow.tsx         # แสดงหนังเป็นแถว
│       │   ├── MovieRow.css
│       │   ├── MovieCard.tsx        # การ์ดแสดงภาพยนตร์
│       │   └── LoginForm.tsx        # ฟอร์ม Login
│       │
│       ├── context/                 # React Context
│       │   └── AuthContext.tsx      # จัดการสถานะ Authentication
│       │
│       ├── pages/                   # หน้าต่างๆ ของเว็บไซต์
│       │   ├── Home.tsx             # หน้าแรก
│       │   ├── Home.css
│       │   ├── LoginPage.tsx        # หน้า Login
│       │   ├── LoginPage.css
│       │   ├── RegisterPage.tsx     # หน้าสมัครสมาชิก
│       │   ├── MovieDetail.tsx      # หน้ารายละเอียดหนัง
│       │   ├── MovieDetail.css
│       │   ├── GenrePage.tsx        # หน้ากรองตาม Genre
│       │   ├── GenrePage.css
│       │   ├── AddMoviePage.tsx     # หน้าเพิ่มหนัง (Admin)
│       │   ├── AddMoviePage.css
│       │   └── EditMoviePage.tsx    # หน้าแก้ไขหนัง (Admin)
│       │
│       └── assets/                  # รูปภาพและไฟล์ static
│
├── docker-compose.yml               # Docker Compose สำหรับรันทั้งระบบ
└── README.md                        # คู่มือการใช้งานโปรเจกต์

```

---

## 🌟 ฟีเจอร์หลักของระบบ

### 1. ระบบยืนยันตัวตน (Authentication & Authorization)

#### การสมัครสมาชิก (Register)
- ผู้ใช้สามารถสมัครสมาชิกด้วย username, email และ password
- รหัสผ่านจะถูกเข้ารหัสด้วย bcrypt ก่อนบันทึกลงฐานข้อมูล
- ระบบจะกำหนด Role เป็น USER โดยอัตโนมัติ

#### การเข้าสู่ระบบ (Login)
- ใช้ JWT (JSON Web Token) สำหรับการยืนยันตัวตน
- Token จะถูกเก็บไว้ใน localStorage
- รองรับ Persistent Login (รีเฟรชหน้าแล้วยังอยู่)
- ระบบจะตรวจสอบ Token อัตโนมัติเมื่อเข้าถึง Protected Routes

#### Role-based Access Control
- **USER:** สามารถดูหนัง, เขียนรีวิว, ให้คะแนน
- **ADMIN:** สิทธิ์ทั้งหมดของ USER + เพิ่ม/แก้ไข/ลบหนัง

### 2. ระบบจัดการภาพยนตร์ (Movies Management)

#### การแสดงผลภาพยนตร์
- **Hero Section:** แสดงหนังเด่นประจำเดือนขนาดใหญ่
- **Movie Rows:** แสดงหนังแบ่งตามประเภท (Action, Comedy, Drama, Horror, ฯลฯ)
- **Responsive Design:** รองรับการแสดงผลบนหน้าจอทุกขนาด
- **Hover Effects:** แสดงข้อมูลเพิ่มเติมเมื่อเอาเมาส์ชี้

#### หน้ารายละเอียดภาพยนตร์
- แสดงข้อมูลครบถ้วน: ชื่อ, คำอธิบาย, ปีที่ฉาย, ผู้กำกับ, คะแนนเฉลี่ย
- แสดงรายการรีวิวทั้งหมด
- สามารถเขียนรีวิวและให้คะแนนได้
- ปุ่ม "เพิ่มเข้าลิสต์" (สำหรับเตรียมเพิ่มฟีเจอร์ Watchlist)

#### การจัดการหนัง (Admin Only)
- **เพิ่มหนังใหม่:** กรอกข้อมูลพร้อม URL โปสเตอร์
- **แก้ไขหนัง:** แก้ไขข้อมูลหนังที่มีอยู่
- **ลบหนัง:** ลบหนังออกจากระบบ
- **กำหนด Genres:** เลือกหลายประเภทให้กับหนังแต่ละเรื่อง

### 3. ระบบรีวิวและคะแนน (Reviews & Ratings)

#### การเขียนรีวิว
- ผู้ใช้ที่ล็อกอินแล้วสามารถเขียนรีวิวได้
- สามารถให้คะแนนดาว 1-10 คะแนน
- สามารถเขียนความคิดเห็นเป็นข้อความ (Optional)
- แสดงชื่อผู้เขียนรีวิวและวันที่เขียน

#### การแสดงผลรีวิว
- แสดงรีวิวทั้งหมดในหน้ารายละเอียดหนัง
- คำนวณคะแนนเฉลี่ยจากรีวิวทั้งหมด
- แสดงจำนวนรีวิวทั้งหมด
- เรียงลำดับรีวิวจากใหม่ไปเก่า

### 4. ระบบกรองตามประเภท (Genre Filtering)

#### Hamburger Menu
- เมนูแสดง/ซ่อนด้านข้าง
- แสดงรายการ Genres ทั้งหมด
- คลิกเพื่อกรองหนังตามประเภทที่เลือก

#### Genre Page
- แสดงหนังเฉพาะประเภทที่เลือก
- เรียงลำดับตามคะแนนหรือชื่อ
- แสดงจำนวนหนังในแต่ละประเภท

### 5. ระบบ Navigation และ UI/UX

#### Navbar
- โลโก้และชื่อเว็บไซต์
- ปุ่ม Hamburger Menu (กรองตาม Genre)
- ปุ่ม Login/Logout
- แสดงชื่อผู้ใช้เมื่อล็อกอินแล้ว
- Fixed position ติดด้านบน

#### Theme & Design
- ใช้โทนสีแดง-ดำสไตล์ Netflix
- Typography: Helvetica Neue, Arial
- Smooth animations และ transitions
- Modern และ minimalist design

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

### 1. Users Table
```
- id: UUID (Primary Key)
- username: string (Unique)
- email: string (Unique)
- password: string (Hashed)
- role: enum (ADMIN, USER)
- createdAt: timestamp
- updatedAt: timestamp
```

### 2. Movies Table
```
- id: UUID (Primary Key)
- title: string
- description: text
- releaseYear: integer
- director: string
- posterUrl: string
- trailerUrl: string (Optional)
- createdAt: timestamp
- updatedAt: timestamp
```

### 3. Genres Table
```
- id: UUID (Primary Key)
- name: string (Unique)
- description: text
- createdAt: timestamp
- updatedAt: timestamp
```

### 4. Reviews Table
```
- id: UUID (Primary Key)
- rating: integer (1-10)
- comment: text
- movieId: UUID (Foreign Key → Movies)
- userId: UUID (Foreign Key → Users)
- createdAt: timestamp
- updatedAt: timestamp
```

### 5. Movie_Genres Table (Many-to-Many)
```
- movieId: UUID (Foreign Key → Movies)
- genreId: UUID (Foreign Key → Genres)
```

### ความสัมพันธ์ระหว่างตาราง
- **User → Reviews:** One-to-Many (ผู้ใช้คนหนึ่งเขียนได้หลายรีวิว)
- **Movie → Reviews:** One-to-Many (หนังเรื่องหนึ่งมีได้หลายรีวิว)
- **Movie ↔ Genres:** Many-to-Many (หนังหนึ่งเรื่องมีได้หลาย Genre)

---

## 🔌 REST API Endpoints

### Authentication APIs
```
POST   /auth/register          # สมัครสมาชิก
POST   /auth/login             # เข้าสู่ระบบ
GET    /auth/profile           # ดูโปรไฟล์ (ต้อง Login)
```

### Movies APIs
```
GET    /movies                 # ดูหนังทั้งหมด
GET    /movies/:id             # ดูหนังตาม ID
POST   /movies                 # เพิ่มหนัง (Admin only)
PATCH  /movies/:id             # แก้ไขหนัง (Admin only)
DELETE /movies/:id             # ลบหนัง (Admin only)
GET    /movies/genre/:genreId  # ดูหนังตาม Genre
GET    /movies/featured        # ดูหนังเด่น
```

### Genres APIs
```
GET    /genres                 # ดู Genres ทั้งหมด
GET    /genres/:id             # ดู Genre ตาม ID
POST   /genres                 # เพิ่ม Genre (Admin only)
PATCH  /genres/:id             # แก้ไข Genre (Admin only)
DELETE /genres/:id             # ลบ Genre (Admin only)
```

### Reviews APIs
```
GET    /reviews/movie/:movieId # ดูรีวิวของหนังเรื่องนั้น
POST   /reviews                # เขียนรีวิว (ต้อง Login)
PATCH  /reviews/:id            # แก้ไขรีวิวของตัวเอง
DELETE /reviews/:id            # ลบรีวิวของตัวเอง
```

### Users APIs
```
GET    /users                  # ดูผู้ใช้ทั้งหมด (Admin only)
GET    /users/:id              # ดูผู้ใช้ตาม ID
PATCH  /users/:id              # แก้ไขข้อมูลผู้ใช้
DELETE /users/:id              # ลบผู้ใช้ (Admin only)
```

---

## 🛠️ เทคโนโลยีที่ใช้ในโปรเจกต์

### Backend Technologies
1. **NestJS** - Progressive Node.js framework
2. **TypeScript** - Typed JavaScript
3. **TypeORM** - ORM for TypeScript
4. **PostgreSQL** - Relational database
5. **JWT** - Authentication tokens
6. **bcrypt** - Password hashing
7. **class-validator** - DTO validation
8. **class-transformer** - Object transformation
9. **Passport.js** - Authentication middleware

### Frontend Technologies
1. **React 18** - UI library
2. **TypeScript** - Type safety
3. **Vite** - Fast build tool
4. **React Router DOM** - Client-side routing
5. **Context API** - State management
6. **CSS Modules** - Scoped styling
7. **Fetch API** - HTTP requests

### DevOps & Tools
1. **Docker** - Containerization
2. **Docker Compose** - Multi-container orchestration
3. **Nginx** - Web server
4. **Git** - Version control
5. **ESLint** - Code linting
6. **Prettier** - Code formatting

---

## 🚀 การติดตั้งและรันโปรเจกต์

### ข้อกำหนดเบื้องต้น (Prerequisites)
- Node.js (v18 หรือสูงกว่า)
- npm หรือ yarn
- Docker และ Docker Compose (สำหรับรัน PostgreSQL)
- Git

### วิธีการติดตั้ง

#### 1. Clone โปรเจกต์
```bash
git clone <repository-url>
cd mini-project
```

#### 2. ติดตั้ง Backend
```bash
cd backend
npm install

# รัน PostgreSQL ด้วย Docker
docker-compose up -d

# รัน migration และ seed data
npm run seed

# สร้าง Admin user
npm run create-admin

# รัน Backend
npm run start:dev
```

#### 3. ติดตั้ง Frontend
```bash
cd frontend
npm install

# รัน Frontend
npm run dev
```

#### 4. เข้าใช้งาน
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api

### การรันด้วย Docker
```bash
# รันทั้งระบบ (Backend + Frontend + Database)
docker-compose up -d

# ดู logs
docker-compose logs -f

# หยุดระบบ
docker-compose down
```

---

## 📝 วิธีการใช้งาน

### สำหรับผู้ใช้ทั่วไป (USER)

1. **เปิดเว็บไซต์**: ไปที่ http://localhost:5173
2. **สมัครสมาชิก**: คลิกปุ่ม "สมัครสมาชิก" แล้วกรอกข้อมูล
3. **เข้าสู่ระบบ**: ใช้ username และ password ที่สมัครไว้
4. **เรียกดูหนัง**: เลื่อนดูหนังในหน้าแรก หรือกรองตาม Genre
5. **ดูรายละเอียด**: คลิกที่โปสเตอร์หรือชื่อหนัง
6. **เขียนรีวิว**: ในหน้ารายละเอียด ให้คะแนนและเขียนความคิดเห็น
7. **ออกจากระบบ**: คลิกปุ่ม "ออกจากระบบ" มุมบนขวา

### สำหรับผู้ดูแลระบบ (ADMIN)

1. **เข้าสู่ระบบ**: ใช้บัญชี Admin
2. **เพิ่มหนัง**: ไปที่หน้า "เพิ่มหนัง" กรอกข้อมูลและ URL โปสเตอร์
3. **แก้ไขหนัง**: คลิกปุ่ม "แก้ไข" ในหน้ารายละเอียดหนัง
4. **ลบหนัง**: คลิกปุ่ม "ลบ" ในหน้ารายละเอียดหนัง
5. **จัดการ Genres**: เพิ่ม/แก้ไข/ลบประเภทหนัง

---

## 🔒 ความปลอดภัย (Security Features)

1. **Password Hashing**: ใช้ bcrypt เข้ารหัสรหัสผ่าน (10 rounds)
2. **JWT Authentication**: Token มีอายุ 24 ชั่วโมง
3. **Route Guards**: ป้องกันการเข้าถึง API โดยไม่ได้รับอนุญาต
4. **Role-based Authorization**: แยกสิทธิ์ Admin และ User
5. **Input Validation**: ตรวจสอบข้อมูลด้วย class-validator
6. **SQL Injection Protection**: ใช้ TypeORM Parameterized Queries
7. **CORS Configuration**: กำหนด allowed origins
8. **Environment Variables**: เก็บ secrets ใน .env

---

## 🎨 ความโดดเด่นของ UI/UX

1. **Netflix-inspired Design**: ธีมสีแดง-ดำสไตล์ Netflix
2. **Responsive Layout**: รองรับหน้าจอทุกขนาด (Mobile, Tablet, Desktop)
3. **Smooth Animations**: Transitions และ hover effects
4. **Intuitive Navigation**: เมนูที่ใช้งานง่าย
5. **Fast Loading**: Optimized images และ lazy loading
6. **Clear Feedback**: แสดงสถานะการทำงาน (Loading, Success, Error)
7. **Accessible**: ใส่ใจ Accessibility standards

---

## 📊 Performance Optimization

### Frontend
- **Code Splitting**: แยก bundle ตาม routes
- **Lazy Loading**: โหลดรูปภาพเมื่อจำเป็น
- **Caching**: เก็บ API responses
- **Minification**: ลดขนาดไฟล์ CSS/JS

### Backend
- **Database Indexing**: Index สำหรับ queries ที่ใช้บ่อย
- **Connection Pooling**: จัดการ database connections
- **Caching Strategy**: Cache data ที่ไม่เปลี่ยนบ่อย
- **Pagination**: แบ่งหน้าสำหรับข้อมูลจำนวนมาก

---

## 🐛 การจัดการ Errors

### Frontend Error Handling
- Try-catch blocks สำหรับ async operations
- Error boundaries สำหรับ React components
- User-friendly error messages
- Redirect to login เมื่อ token หมดอายุ

### Backend Error Handling
- Global exception filters
- Custom exception classes
- Proper HTTP status codes
- Detailed error logging

---

## 🧪 การทดสอบ (Testing)

### Unit Tests
- Controller tests (auth.controller.spec.ts)
- Service tests (auth.service.spec.ts)
- Test coverage สำหรับ business logic

### Integration Tests
- API endpoint testing
- Database operations testing
- Authentication flow testing

### Manual Testing
- ทดสอบ UI/UX บนหลาย browsers
- ทดสอบ responsive design
- ทดสอบ user flows ทั้งหมด

---

## 🔮 ฟีเจอร์ที่สามารถพัฒนาต่อ (Future Enhancements)

1. **Watchlist**: เพิ่มหนังเข้าลิสต์ที่อยากดู
2. **Search Function**: ค้นหาหนังด้วยชื่อ, ผู้กำกับ, นักแสดง
3. **Advanced Filtering**: กรองตามปี, คะแนน, popularity
4. **Recommendations**: แนะนำหนังตามความชอบ
5. **Social Features**: Follow ผู้ใช้คนอื่น, Like รีวิว
6. **Video Trailer**: เล่นตัวอย่างหนังในเว็บ
7. **Email Notifications**: แจ้งเตือนหนังใหม่, รีวิวใหม่
8. **Multi-language Support**: รองรับหลายภาษา
9. **Dark/Light Mode Toggle**: สลับธีมสี
10. **Advanced Analytics**: Dashboard สำหรับ Admin
11. **Comment System**: แสดงความคิดเห็นในรีวิว
12. **Rating System**: ระบบ upvote/downvote รีวิว
13. **User Profiles**: หน้าโปรไฟล์พร้อมประวัติรีวิว
14. **Movie Lists**: สร้างลิสต์หนังแนะนำ
15. **Export Data**: ส่งออกข้อมูลเป็น CSV/PDF

---

## 👥 การแบ่งหน้าที่การพัฒนา

### นายศิรสิทธิ์ ศุภสาร (6810110510)
- Backend Architecture & Setup
- Authentication System (JWT, Guards)
- Movies & Genres APIs
- Database Design & Migration
- Docker Configuration

### นางสาวนิ-นฎา นิเดร์หะ (6810110628)
- Frontend Architecture & Setup
- UI/UX Design & Implementation
- React Components & Pages
- State Management (Context API)
- Styling & Responsive Design

### งานร่วมกัน
- API Integration
- Testing & Debugging
- Documentation
- Deployment Setup
- Code Review

---

## 📚 การเรียนรู้จากโปรเจกต์นี้

### ทักษะที่ได้รับ
1. **Full-Stack Development**: พัฒนาทั้ง Frontend และ Backend
2. **TypeScript**: ใช้ Type Safety ในทั้งสองส่วน
3. **REST API Design**: ออกแบบ API ที่ดี
4. **Database Design**: ออกแบบ Schema และ Relationships
5. **Authentication**: ระบบยืนยันตัวตนด้วย JWT
6. **Authorization**: Role-based Access Control
7. **Docker**: Containerization และ Orchestration
8. **Git**: Version Control และ Collaboration
9. **React Patterns**: Hooks, Context, Component Composition
10. **NestJS Patterns**: Modules, Services, Controllers

### ปัญหาที่พบและวิธีแก้
1. **CORS Issues**: แก้ด้วยการ config CORS ใน NestJS
2. **JWT Expiration**: จัดการ refresh token และ auto-logout
3. **Image Loading**: ใช้ lazy loading และ placeholder
4. **Many-to-Many Relations**: ใช้ TypeORM decorators
5. **Type Safety**: กำหนด interfaces และ DTOs ที่ชัดเจน

---

## 📞 ติดต่อและสนับสนุน

หากมีคำถามหรือพบปัญหาในการใช้งาน สามารถติดต่อได้ที่:
- นายศิรสิทธิ์ ศุภสาร: [อีเมล/เบอร์โทร]
- นางสาวนิ-นฎา นิเดร์หะ: [อีเมล/เบอร์โทร]

หรือสร้าง Issue ใน GitHub Repository

---

## 📄 License

โปรเจกต์นี้พัฒนาขึ้นเพื่อการศึกษาและไม่มีวัตถุประสงค์เชิงพาณิชย์

---

## 🙏 Credits & Acknowledgments

- **NestJS**: https://nestjs.com/
- **React**: https://react.dev/
- **TypeORM**: https://typeorm.io/
- **Vite**: https://vitejs.dev/
- **PostgreSQL**: https://www.postgresql.org/
- **Netflix**: Inspiration for UI design
- **TMDb API**: Movie data reference

---

## 📝 Changelog

### Version 1.0.0 (2569)
- ✅ Initial release
- ✅ Complete authentication system
- ✅ Movies CRUD operations
- ✅ Reviews and ratings system
- ✅ Genre filtering
- ✅ Responsive UI
- ✅ Docker support
- ✅ Admin panel

---

**สร้างด้วยความตั้งใจและรักในการเขียนโค้ด ❤️**  
**MovieFlix Team - 2569**
