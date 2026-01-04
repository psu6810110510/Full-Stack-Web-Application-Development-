// frontend/src/types.ts (หรือ interfaces.ts)

// สร้าง Interface ให้ตรงกับ Entity ใน Backend
export interface Movie {
  movie_id: number;
  title: string;
  description?: string; // ใส่ ? เพราะใน Backend เป็น nullable: true
  posterUrl?: string;   // ใส่ ? เพราะใน Backend เป็น nullable: true
  
  // ถ้าคุณเพิ่ม field พวกนี้ใน backend ก็อย่าลืมใส่ตรงนี้ด้วย
  // director?: string;
  // releaseDate?: string; // ข้อมูลวันที่จาก API มักจะส่งมาเป็น string (ISO format)
  // duration?: number;
}