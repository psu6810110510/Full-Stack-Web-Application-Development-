# 🐳 Docker Setup Guide - Movie Review Application

## ✅ ข้อดีของการใช้ Docker

1. **Database เดียวกัน** - ทุกคนเชื่อมต่อกับ database container เดียวกัน
2. **ง่ายต่อการ setup** - รันคำสั่งเดียวได้ทุกอย่าง
3. **ไม่ต้องติดตั้ง** Node.js, PostgreSQL, หรืออะไรเลยบนเครื่อง
4. **Consistent environment** - รันเหมือนกันทุกเครื่อง

---

## 📋 Pre-requisites

ติดตั้งเฉพาะ:
- **Docker Desktop** (Windows/Mac): https://www.docker.com/products/docker-desktop
- หรือ **Docker Engine** (Linux)

---

## 🚀 วิธีรันโปรเจค

### 1. รันทุก Service พร้อมกัน

```bash
# ที่ root directory ของโปรเจค (c:\nadaworks\mini-project)
docker-compose up -d
```

คำสั่งนี้จะ:
- ✅ Build backend image
- ✅ Build frontend image  
- ✅ Start PostgreSQL database
- ✅ Start backend API (port 3000)
- ✅ Start frontend (port 5173)

### 2. ตรวจสอบว่าทุก Container รันอยู่

```bash
docker-compose ps
```

ควรเห็น 3 containers:
- `movie-review-db` (database)
- `movie-review-backend` (API)
- `movie-review-frontend` (web)

### 3. ดู Logs

```bash
# ดู logs ทั้งหมด
docker-compose logs -f

# ดู logs เฉพาะ backend
docker-compose logs -f backend

# ดู logs เฉพาะ database
docker-compose logs -f db
```

---

## 🌐 เข้าใช้งาน Application

### จากเครื่องที่รัน Docker:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: localhost:5433

### จากเครื่องอื่นในเครือข่ายเดียวกัน:
1. หา IP ของเครื่องที่รัน Docker:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux  
   ifconfig
   ```

2. เข้าใช้งานผ่าน IP (ตัวอย่าง: 192.168.1.100):
   - **Frontend**: http://192.168.1.100:5173
   - **Backend API**: http://192.168.1.100:3000

---

## 🛠️ คำสั่งที่ใช้บ่อย

### สร้าง Admin User
```bash
docker-compose exec backend npm run create:admin
```

### Seed ข้อมูลตัวอย่าง
```bash
docker-compose exec backend npm run seed
```

### Restart Services
```bash
# Restart ทั้งหมด
docker-compose restart

# Restart เฉพาะ backend
docker-compose restart backend
```

### หยุดการทำงาน
```bash
# หยุดแต่เก็บข้อมูล
docker-compose stop

# หยุดและลบ containers (แต่เก็บ database volume)
docker-compose down

# หยุดและลบทุกอย่างรวมถึงข้อมูล (ระวัง!)
docker-compose down -v
```

### Rebuild Images
```bash
# Rebuild ทุก service
docker-compose up -d --build

# Rebuild เฉพาะ backend
docker-compose up -d --build backend
```

---

## 🔧 Development Mode

ถ้าต้องการแก้โค้ดและเห็นผลทันที:

```bash
# แก้ docker-compose.yml ให้ backend ใช้ volume mapping
# (เปิด comment บรรทัด volumes ใน backend service)

docker-compose up -d backend
```

Backend จะ hot-reload เมื่อแก้ไฟล์ใน `backend/src/`

---

## 🐛 Troubleshooting

### ❌ Port already in use

ถ้า port 3000, 5173, หรือ 5433 ถูกใช้งานอยู่:

**Option 1:** ปิด process ที่ใช้ port นั้น
```bash
# Windows
netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F
```

**Option 2:** เปลี่ยน port ใน `docker-compose.yml`
```yaml
ports:
  - '3001:3000'  # ใช้ port 3001 แทน
```

### ❌ Cannot connect to database

```bash
# ตรวจสอบว่า database container รันอยู่
docker-compose ps db

# ดู logs
docker-compose logs db

# Restart database
docker-compose restart db
```

### ❌ Backend ไม่ทำงาน

```bash
# ดู logs
docker-compose logs backend

# เข้าไปดูใน container
docker-compose exec backend sh

# Rebuild backend
docker-compose up -d --build backend
```

---

## 📊 เข้าถึง Database โดยตรง

```bash
# เข้า PostgreSQL shell
docker-compose exec db psql -U admin -d movie_review_db

# Query ตัวอย่าง
SELECT * FROM movie;
SELECT * FROM "user";
\dt  # แสดง tables ทั้งหมด
\q   # ออกจาก psql
```

---

## 🎯 Network Architecture

```
Internet/LAN
    ↓
Host Machine (192.168.1.100)
    ↓
┌─────────────────────────────────┐
│   Docker Network (bridge)       │
│                                 │
│  ┌──────────┐  ┌─────────────┐ │
│  │ Frontend │  │   Backend   │ │
│  │ (nginx)  │  │  (Node.js)  │ │
│  │ Port: 80 │  │  Port: 3000 │ │
│  └────┬─────┘  └──────┬──────┘ │
│       │                │        │
│       └────────┬───────┘        │
│                ↓                │
│         ┌────────────┐          │
│         │ PostgreSQL │          │
│         │ Port: 5432 │          │
│         └────────────┘          │
└─────────────────────────────────┘

Exposed Ports:
- 5173:80 (Frontend)
- 3000:3000 (Backend)  
- 5433:5432 (Database)
```

---

## 🔐 Security Notes (สำหรับ Production)

⚠️ **ไฟล์ docker-compose.yml ปัจจุบันเหมาะกับ development เท่านั้น**

สำหรับ production ควร:
1. เปลี่ยน passwords และ secrets ทั้งหมด
2. ใช้ `.env` file แทน hardcoded values
3. ปิด `synchronize: true` ใน TypeORM
4. ใช้ HTTPS
5. Setup proper firewall rules
6. ใช้ Docker secrets สำหรับ sensitive data

---

## 📝 Summary

**วิธีแก้ปัญหาที่เพื่อนไม่เห็นหนัง:**

✅ **เดิม:** แต่ละเครื่องรัน backend และ database ของตัวเอง (ข้อมูลแยกกัน)
✅ **ตอนนี้:** ทุกคนเชื่อมต่อกับ containers เดียวกัน (ข้อมูลรวมกัน)

**ให้เพื่อนทำ:**
1. Clone โปรเจค
2. รัน `docker-compose up -d`  
3. เข้า `http://<IP_เครื่องคุณ>:5173`
4. เสร็จ! เห็นข้อมูลเดียวกัน ✨
