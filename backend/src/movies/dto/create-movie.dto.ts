export class CreateMovieDto {
  title: string;
  description: string;
  posterUrl: string;
  director: string;
  releaseDate: string; // รับมาเป็น string จาก JSON (เดี๋ยว Database แปลงต่อเอง)
  duration: number;
  genreIds: number[]; // นี่คือส่วนสำคัญที่เราจะรับเป็น Array ของเลข ID
}