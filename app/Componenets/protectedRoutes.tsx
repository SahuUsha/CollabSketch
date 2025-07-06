'use client';

import { ReactNode, useEffect, useState } from 'react';

// import { isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../utils/auth';


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/signin');
    } else {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
