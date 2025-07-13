import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'mysecretkey') {
      localStorage.setItem('admin_token', 'mysecretkey');
      router.push('/');
    } else {
      alert('Password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4">🔐 Login Admin</h1>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Masukkan Password Admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </div>
    </div>
  );
}
