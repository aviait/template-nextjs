import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect('/admin/login');

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          {process.env.APP_NAME ?? 'Admin'}
        </h1>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            style={{
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        </form>
      </div>

      <section
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Ambiente</p>
        <code style={{ fontSize: 14 }}>{process.env.NODE_ENV}</code>

        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Versão</p>
        <code style={{ fontSize: 14 }}>{process.env.APP_VERSION ?? 'dev'}</code>

        {process.env.GIT_COMMIT_SHORT && (
          <>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Commit</p>
            <code style={{ fontSize: 14 }}>{process.env.GIT_COMMIT_SHORT}</code>
          </>
        )}
      </section>

      <p style={{ margin: 0, fontSize: 13, color: '#9ca3af' }}>
        Substitua este conteúdo pela dashboard da aplicação.
      </p>
    </main>
  );
}
