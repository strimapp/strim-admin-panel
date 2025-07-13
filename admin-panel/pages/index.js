import { useEffect, useState } from 'react';
import { validateLicense, resetLicense } from '../lib/api';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('admin_token');
    if (!saved || saved !== 'mysecretkey') {
      router.push('/login');
    } else {
      setToken(saved);
    }
  }, []);

  const handleValidate = async () => {
    setLoading(true);
    const res = await validateLicense(key, token);
    setResult(res);
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    const res = await resetLicense(key, token);
    setResult(res);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>STRIM Admin Panel</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </Head>
      <div className="min-h-screen bg-gray-950 text-white font-inter px-4 py-6">
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <img src="https://drive.google.com/uc?export=view&id=1y5fwgAzG5ujHbZ0AZCN_HQ4opRrJRkIi" alt="STRIM Logo" className="h-12 w-auto" />
            <h1 className="text-2xl font-bold text-[#3fe0d0]">Admin Panel STRIM</h1>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-300">License Key</label>
            <input
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3fe0d0]"
              placeholder="Masukkan License Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mb-4">
            <button onClick={handleValidate} className="flex-1 bg-[#3fe0d0] text-black py-2 rounded font-semibold hover:bg-[#2ccabe]">
              <i className="fas fa-search mr-2"></i> Cek Lisensi
            </button>
            <button onClick={handleReset} className="flex-1 bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-500">
              <i className="fas fa-undo-alt mr-2"></i> Reset Lisensi
            </button>
          </div>
          {loading && <p className="text-gray-400">🔄 Memproses...</p>}
          {result && (
            <pre className="bg-gray-800 text-sm rounded p-4 whitespace-pre-wrap overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      </div>
    </>
  );
}
