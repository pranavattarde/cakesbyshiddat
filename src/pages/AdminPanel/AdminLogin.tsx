import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import { FaLock, FaEnvelope, FaBirthdayCake, FaArrowLeft, FaKey } from 'react-icons/fa';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();

  const defaultEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@cakesbyshiddat.com';
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin-panel');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const ok = await login(email, password);
      if (ok) {
        navigate('/admin-panel');
      } else {
        setError('Invalid credentials. Check your email and password, or set VITE_ADMIN_EMAIL & VITE_ADMIN_PASSWORD in Vercel.');
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseDefault = () => {
    setEmail('admin@cakesbyshiddat.com');
    setPassword('Admin@123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] via-[#fcf1e8] to-[#fceee4] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8a7a72] hover:text-[#d7a88c] mb-6 transition"
        >
          <FaArrowLeft />
          <span>Back to Main Website</span>
        </Link>

        {/* Card */}
        <div className="rounded-[36px] border border-[#f0dfd7] bg-white/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#d7a88c] to-[#c99a7d] text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-[#d7a88c]/30">
              <FaBirthdayCake />
            </div>
            <h1 className="text-3xl font-bold text-[#3a2d28]" style={{ fontFamily: 'Playfair Display' }}>
              Content Manager
            </h1>
            <p className="text-xs uppercase tracking-[3px] text-[#b89a89] font-medium mt-1">
              Cakes by Shiddat In-Built Admin
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cakesbyshiddat.com"
                  className="w-full rounded-2xl border border-[#eddcd2] bg-white pl-11 pr-4 py-3.5 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#695349] font-semibold mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-2xl border border-[#eddcd2] bg-white pl-11 pr-4 py-3.5 text-sm text-[#3a2d28] focus:border-[#d7a88c] focus:outline-none shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#d7a88c] to-[#c99a7d] hover:brightness-105 text-white font-medium py-3.5 shadow-lg shadow-[#d7a88c]/25 transition hover:scale-[1.02] disabled:opacity-50 mt-2 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Content Panel'}
            </button>
          </form>

          {/* Quick Credential Helper Pill for Zero-Database Mode */}
          <div className="mt-6 pt-5 border-t border-[#f2e2d8]">
            <div className="rounded-2xl bg-[#fff8f2] border border-[#f0dcce] p-3 text-center">
              <span className="text-[11px] font-semibold text-[#8a7a72] block">
                Zero-Database Mode (Configured via Vercel env)
              </span>
              <p className="text-xs text-[#554037] mt-0.5 font-medium">
                Default: <span className="font-mono text-[11px] text-[#c99a7d]">admin@cakesbyshiddat.com</span> /{' '}
                <span className="font-mono text-[11px] text-[#c99a7d]">Admin@123456</span>
              </p>
              <button
                type="button"
                onClick={handleUseDefault}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#d7a88c] hover:underline mt-1.5 cursor-pointer"
              >
                <FaKey className="text-[9px]" /> Auto-fill default credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
