import { useState } from 'react';
import { login } from '../api';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;