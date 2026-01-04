import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, password });
    alert(`Login with: ${username}`); // ทดสอบว่าปุ่มทำงาน
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Login</h3>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          value={username} 
          onChange={handleUsernameChange} 
          placeholder="Username"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;