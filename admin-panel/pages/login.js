import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === 'm0G4beRkaH') {
      localStorage.setItem('admin_token', 'm0G4beRkaH');
      router.push('/');
    } else {
      alert('Password salah!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center font-inter px-4">
      <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#3fe0d0] mb-6">Login Admin STRIM</h2>
        <input
          type="password"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3fe0d0]"
          placeholder="Masukkan Password Admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#3fe0d0] text-black py-2 rounded font-semibold hover:bg-[#2ccabe]"
        >
          <i className="fas fa-lock mr-2"></i>
          Login
        </button>
      </div>
    </div>
  );
}
