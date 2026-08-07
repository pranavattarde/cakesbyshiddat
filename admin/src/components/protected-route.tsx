import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export function ProtectedRoute({ children }: PropsWithChildren): React.JSX.Element {
  const { isAuthenticated } = useAuth(); const location = useLocation();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace state={{ from: location }} />;
}
