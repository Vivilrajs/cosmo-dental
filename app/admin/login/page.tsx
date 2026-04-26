'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useStore } from '@/lib/store';
import { createClient } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAdminLoggedIn } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }

    setIsAdminLoggedIn(true);
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-12 relative">
      <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100/50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 text-center uppercase tracking-wide">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">
              Email
            </label>
            <input
              required
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-slate-50 text-sm font-medium"
              placeholder="admin@yourdomain.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">
              Password
            </label>
            <input
              required
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-slate-50 text-sm font-medium"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full font-semibold text-sm uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Secure Login'}
          </button>
        </form>

        <Link
          href="/"
          className="w-full text-center mt-6 block text-xs font-bold text-slate-400 hover:text-emerald-600 tracking-widest uppercase transition-colors"
        >
          ← Back to Public Site
        </Link>
      </div>
    </div>
  );
}
