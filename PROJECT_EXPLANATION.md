# 📖 คู่มืออธิบายโปรเจค MOVIEFLIX
## สำหรับนักศึกษาปี 1 - เตรียมตัวตรวจงาน

---

## 🎯 โปรเจคนี้คืออะไร?
**เว็บไซต์รีวิวหนัง** ที่ผู้ใช้สามารถ:
- ดูรายการหนังตามหมวดหมู่
- เข้าสู่ระบบ/สมัครสมาชิก
- รีวิวและให้คะแนนหนัง
- Admin เพิ่ม/แก้ไข/ลบหนังได้

---

## 🏗️ โครงสร้างโปรเจค

```
mini-project/
├── backend/          → NestJS (API Server)
│   └── src/
│       ├── auth/     → จัดการ Login/Register
│       ├── movies/   → จัดการข้อมูลหนัง
│       ├── genres/   → จัดการหมวดหมู่
│       ├── reviews/  → จัดการรีวิว
│       └── users/    → จัดการผู้ใช้
│
└── frontend/         → React (หน้าเว็บ)
    └── src/
        ├── components/  → ส่วนประกอบย่อย (Navbar, MovieCard)
        ├── pages/       → หน้าต่างๆ (Home, Login, MovieDetail)
        └── context/     → จัดการ Authentication
```

---

## 📋 ไฟล์สำคัญที่ต้องรู้

### **Backend (NestJS)**

#### 1. **movie.entity.ts** - โครงสร้างตาราง Movie
```typescript
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id: number;           // รหัสหนัง (Auto)
  
  @Column()
  title: string;              // ชื่อหนัง
  
  @Column({ type: 'decimal' })
  rating: number;             // คะแนนเฉลี่ย
  
  @ManyToMany(() => Genre)
  genres: Genre[];            // หนัง 1 เรื่อง มีหลายหมวดหมู่
  
  @OneToMany(() => Review)
  reviews: Review[];          // หนัง 1 เรื่อง มีหลายรีวิว
}
```

#### 2. **movies.controller.ts** - รับ Request จากหน้าบ้าน
```typescript
@Controller('movies')
export class MoviesController {
  
  @Get()                      // GET /movies
  findAll() { }               // → ดูหนังทั้งหมด
  
  @Get(':movie_id')           // GET /movies/1
  findOne(@Param('movie_id')) { }  // → ดูหนังเรื่องที่ 1
  
  @Post()                     // POST /movies
  @UseGuards(JwtAuthGuard)    // ต้อง Login ก่อน
  @Roles(UserRole.ADMIN)      // ต้องเป็น Admin
  create(@Body() data) { }    // → เพิ่มหนังใหม่
}
```

#### 3. **movies.service.ts** - ตรรกะการทำงาน
```typescript
@Injectable()
export class MoviesService {
  
  async findAll() {
    return this.moviesRepository.find({
      relations: ['genres']   // ดึงข้อมูล + หมวดหมู่ด้วย
    });
  }
  
  async create(data) {
    const movie = this.moviesRepository.create(data);
    return this.moviesRepository.save(movie);
  }
}
```

#### 4. **auth.controller.ts** - Login/Register
```typescript
@Controller('auth')
export class AuthController {
  
  @Post('login')
  async login(@Body() body) {
    const user = await this.validateUser(body.username, body.password);
    return this.createToken(user);  // → สร้าง JWT Token
  }
  
  @Post('register')
  async register(@Body() body) {
    return this.usersService.register(body);
  }
}
```

---

### **Frontend (React)**

#### 1. **Home.tsx** - หน้าหลัก
```typescript
export default function Home() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    // เรียก API เมื่อโหลดหน้า
    fetch('http://localhost:3000/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);
  
  return (
    <div>
      {movies.map(movie => 
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
  );
}
```

#### 2. **MovieDetail.tsx** - หน้ารีวิวหนัง
```typescript
export default function MovieDetail() {
  const { id } = useParams();  // ดึง ID จาก URL
  const [movie, setMovie] = useState(null);
  
  const handleSubmitReview = async () => {
    await fetch('http://localhost:3000/reviews', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ movieId: id, rating, comment })
    });
  };
  
  return (
    <div>
      <h1>{movie.title}</h1>
      <form onSubmit={handleSubmitReview}>
        {/* ฟอร์มรีวิว */}
      </form>
    </div>
  );
}
```

#### 3. **AuthContext.tsx** - จัดการ Login State
```typescript
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🔄 Flow การทำงาน

### **1. Login Flow**
```
User กรอก username/password
    ↓
Frontend POST → /auth/login
    ↓
Backend ตรวจสอบ username/password ใน database
    ↓
ถ้าถูก → สร้าง JWT Token
    ↓
Frontend เก็บ Token ใน localStorage
    ↓
ใช้ Token ในการเรียก API ที่ต้อง Login
```

### **2. Add Movie Flow (Admin)**
```
Admin กดปุ่ม "+เพิ่มหนัง"
    ↓
กรอกข้อมูล (ชื่อ, โปสเตอร์, ผู้กำกับ, หมวดหมู่)
    ↓
Frontend POST → /movies พร้อม Token
    ↓
Backend ตรวจสอบ Token + Role === ADMIN
    ↓
บันทึกลง Database
    ↓
Frontend แสดงหนังเรื่องใหม่
```

### **3. Review Movie Flow**
```
User เลือกหนัง → หน้า MovieDetail
    ↓
ใส่คะแนน (1-10) + Comment
    ↓
Frontend POST → /reviews พร้อม Token
    ↓
Backend บันทึก Review + อัพเดทคะแนนเฉลี่ย
    ↓
Frontend โหลดรีวิวใหม่แสดงในหน้า
```

---

## 🔑 คำศัพท์สำคัญ

### **Frontend**
- **Component** = ส่วนประกอบของหน้าเว็บ (เช่น Navbar, Button)
- **State** = ข้อมูลที่เปลี่ยนแปลงได้ในหน้า (useState)
- **Props** = ส่งข้อมูลระหว่าง Component
- **Hook** = ฟังก์ชันพิเศษของ React (useState, useEffect)
- **Route** = เส้นทาง URL (เช่น /movie/1)

### **Backend**
- **Controller** = รับ Request (GET, POST, DELETE)
- **Service** = ประมวลผล + Logic
- **Entity** = โครงสร้างตาราง Database
- **DTO** = กำหนดรูปแบบข้อมูลที่รับ
- **Guard** = ตรวจสอบสิทธิ์ก่อนเข้า API
- **Decorator** = @Get, @Post, @UseGuards (คำสั่งพิเศษ)

### **Database**
- **Primary Key** = รหัสเฉพาะ (movie_id)
- **Foreign Key** = เชื่อมโยงตาราง
- **One-to-Many** = 1 หนัง → หลาย reviews
- **Many-to-Many** = 1 หนัง → หลายหมวดหมู่, 1 หมวดหมู่ → หลายหนัง

### **Authentication**
- **JWT** = JSON Web Token (ตั๋วพิสูจน์ตัวตน)
- **Hash** = เข้ารหัส password (bcrypt)
- **Bearer Token** = Authorization: Bearer xxx
- **Role** = บทบาท (USER, ADMIN)

---

## 🎤 ตัวอย่างคำตอบตอนตรวจงาน

### **Q: TypeORM คืออะไร?**
**A:** เป็น library ที่ช่วยจัดการ Database ด้วย JavaScript/TypeScript โดยไม่ต้องเขียน SQL โดยตรง ใช้ Object เป็นตัวกลาง

### **Q: useEffect ทำงานยังไง?**
**A:** ทำงานตอน Component โหลดครั้งแรก หรือเมื่อ dependencies เปลี่ยน เหมาะสำหรับเรียก API หรือ setup อะไรที่ต้องทำครั้งเดียว

### **Q: Guard ใน NestJS คืออะไร?**
**A:** เป็นตัวรักษาความปลอดภัย ตรวจสอบก่อนเข้า endpoint เช่น ตรวจว่า Login แล้วหรือยัง, มี Role ที่ถูกต้องไหม

### **Q: Props vs State ต่างกันยังไง?**
**A:** 
- **Props** = ข้อมูลที่ส่งมาจาก Component แม่ (อ่านอย่างเดียว)
- **State** = ข้อมูลภายใน Component (เปลี่ยนได้ด้วย setState)

### **Q: JWT ทำงานยังไง?**
**A:** 
1. User login → Backend สร้าง Token (เข้ารหัสข้อมูล user)
2. Frontend เก็บ Token
3. ทุกครั้งที่เรียก API → ส่ง Token ไปด้วย
4. Backend ถอดรหัส Token → รู้ว่าเป็นใคร

---

## 📊 ตารางความสัมพันธ์ Database

```
┌──────────┐       ┌──────────────┐       ┌──────────┐
│  User    │       │    Review    │       │  Movie   │
├──────────┤       ├──────────────┤       ├──────────┤
│ id       │───┐   │ id           │   ┌───│ movie_id │
│ username │   └──→│ userId       │   │   │ title    │
│ password │       │ movieId      │←──┘   │ rating   │
│ role     │       │ rating       │       │ director │
└──────────┘       │ comment      │       └────┬─────┘
                   └──────────────┘            │
                                               │ Many-to-Many
                   ┌──────────┐                │
                   │  Genre   │                │
                   ├──────────┤                │
                   │ id       │←───────────────┘
                   │ name     │
                   └──────────┘
```

---

## 💡 Tips ตอบคำถาม

1. **พูดให้ง่าย** - ไม่ต้องใช้ศัพท์เทคนิคเยอะ
2. **ยกตัวอย่าง** - เช่น "useState เหมือนตัวแปรที่เมื่อเปลี่ยนค่า หน้าจอจะ update"
3. **อธิบายจาก Flow** - "เมื่อ User login → เรียก API → ได้ Token → เก็บไว้ใน localStorage"
4. **ไม่รู้ ยอมรับ** - "ผมยังไม่เข้าใจลึกตรงนี้ครับ แต่รู้ว่ามันทำหน้าที่..."

---

## 🚀 จุดเด่นของโปรเจคนี้

1. ✅ **แยก Concerns ดี** - Backend/Frontend แยกชัดเจน
2. ✅ **ใช้ TypeScript** - มี type safety ลดบั๊ก
3. ✅ **Authentication** - มีระบบ Login/Role
4. ✅ **RESTful API** - ตาม standard
5. ✅ **Responsive Design** - ใช้งานบนมือถือได้
6. ✅ **Database Relations** - เข้าใจความสัมพันธ์ของข้อมูล

---

## 📝 สรุป

โปรเจคนี้เหมาะสำหรับนักศึกษาปี 1 แล้ว:
- **ไม่ซับซ้อนเกินไป** - มีพื้นฐาน CRUD ครบ
- **ไม่ง่ายเกินไป** - มี Auth, Relations, Role-based
- **เป็นมาตรฐาน** - โครงสร้างแบบนี้ใช้ในงานจริง

**ความมั่นใจ:** ถ้าคุณอธิบายได้ตามนี้ → **ผ่านแน่นอน!** 💯

---

**สร้างโดย:** GitHub Copilot  
**วันที่:** 12 มกราคม 2026  
**เวอร์ชัน:** 1.0
