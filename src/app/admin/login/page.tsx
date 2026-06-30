'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? 'Credenciais inválidas');
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f9fafb',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '2rem',
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
          {process.env.NEXT_PUBLIC_APP_NAME ?? 'Admin'}
        </h1>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none',
            }}
          />
        </label>

        {error && <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#111827',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
