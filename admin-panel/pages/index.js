import { useState } from 'react';
import { validateLicense, resetLicense } from '../lib/api';

export default function Home() {
  const [key, setKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useState('mysecretkey');

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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">🔐 Admin Panel Strim</h1>
        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Masukkan License Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="flex gap-2 mb-4">
          <button onClick={handleValidate} className="bg-blue-600 text-white px-4 py-2 rounded">Cek Lisensi</button>
          <button onClick={handleReset} className="bg-red-600 text-white px-4 py-2 rounded">Reset Lisensi</button>
        </div>
        {loading && <p>🔄 Memproses...</p>}
        {result && (
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
