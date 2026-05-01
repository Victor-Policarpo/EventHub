import { useHasRole } from '../../hooks';

interface GuardProps {
  role: 'ADMIN' | 'BASIC';
  children: React.ReactNode;
}

export const Guard = ({ role, children }: GuardProps) => {
  const hasPermission = useHasRole(role);

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};