import { useHasRole, useAuth } from '../../hooks';

interface GuardProps {
  role: 'ADMIN' | 'BASIC';
  children: React.ReactNode;
}

export const Guard = ({ role, children }: GuardProps) => {
  const { loading } = useAuth();
  const hasPermission = useHasRole(role);

  if (loading) {
    return null; 
  }

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};