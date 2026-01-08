import { useState } from 'react';
import type { LoginResponse } from './types';

interface LoginProps {
  onLoginSuccess: (token: string) => void; // รับฟังก์ชันมาจาก App เพื่อบอกว่าล็อกอินผ่านแล้ว
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Strict Typing: React.ChangeEvent
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Strict Typing: React.FormEvent
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      const data: LoginResponse = await response.json();
      
      // ส่ง Token กลับไปให้ App.tsx จัดการต่อ
      onLoginSuccess(data.access_token);

    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>เข้าสู่ระบบ</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={handleUsernameChange} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}