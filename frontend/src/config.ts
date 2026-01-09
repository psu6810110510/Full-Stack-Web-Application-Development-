// API Configuration
// เปลี่ยน API_BASE_URL ตามสถานการณ์:
// - สำหรับเครื่องที่รัน Backend: 'http://localhost:3000'
// - สำหรับเครื่องอื่นๆ: 'http://<IP_เครื่องที่รัน_Backend>:3000'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper function สำหรับสร้าง full URL
export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};
