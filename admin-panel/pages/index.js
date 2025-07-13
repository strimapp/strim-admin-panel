import { useEffect, useState } from 'react';
import { resetLicense, validateLicense } from '../lib/api';
import { useRouter } from 'next/router';

export default function Home() {
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token || token !== 'm0G4beRkaH') {
        router.push('/login');
      }
    }
  }, [router]);

  const handleReset = async () => {
    setLoading(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
    const res = await resetLicense(key, token);
    setResult(res);
    setLoading(false);
  };

  const handleValidate = async () => {
    setLoading(true);
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
    const res = await validateLicense(key, token);
    setResult(res);
    setLoading(false);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center font-inter px-4">
      <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <img src="https://lh3.googleusercontent.com/d/1y5fwgAzG5ujHbZ0AZCN_HQ4opRrJRkIi=w200" alt="STRIM Logo" className="h-12 w-auto" />
          <h2 className="text-2xl font-bold text-[#3fe0d0]">Dashboard Admin STRIM</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>

        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Masukkan License Key"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3fe0d0]"
        />

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleValidate}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold"
          >
            Validasi
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded font-semibold"
          >
            Reset
          </button>
        </div>

        {loading && <p className="text-sm text-gray-400">Memproses...</p>}

        {result && (
          <pre className="text-sm bg-gray-800 p-4 rounded overflow-auto max-h-60 whitespace-pre-wrap">
{JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
