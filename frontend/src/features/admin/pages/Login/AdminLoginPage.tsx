import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../../auth/store/auth.store';
import { loginSchema, type LoginFormData } from '../../../auth/validators/login.schema';

import { getErrorMessage } from '../../../../shared/utils/getErrorMessage';

import './adminLogin.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const login = useAuthStore((state) => state.login);
  const { isLoading } = useAuthStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError('');

      await login({
        ...data,
        role: 'ADMIN',
      });

      navigate('/admin');
    } catch (error: unknown) {
      setAuthError(getErrorMessage(error));
    }
  };

  return (
    <div className="admin-login-container">
      <main className="admin-login-card">
        <header className="admin-login-header">
          <div className="admin-brand">
            <div className="admin-brand-mark" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
            </div>

            <span>MediFind</span>
          </div>

          <h1>Admin Login</h1>
        </header>

        {authError && (
          <div className="admin-login-error" role="alert">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>

            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="admin-form-group">
            <label htmlFor="admin-email">Email</label>

            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              placeholder="admin@medifind.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email')}
            />

            {errors.email && <p className="admin-field-error">{errors.email.message}</p>}
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password')}
            />

            {errors.password && <p className="admin-field-error">{errors.password.message}</p>}
          </div>

          <button type="submit" className="admin-login-button" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </main>
    </div>
  );
}
