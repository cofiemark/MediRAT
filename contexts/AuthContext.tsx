import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { User, UserRole } from '../types';

// Mock users for demonstration
const MOCK_USERS: Record<string, User> = {
  'admin@MEDiRAT.com': {
    id: 'user-1',
    name: 'Dr. Evelyn Reed',
    email: 'admin@MEDiRAT.com',
    role: UserRole.ServiceManager,
    permissions: ['view:dashboard', 'view:equipment', 'add:equipment', 'edit:equipment', 'add:staff', 'acknowledge:notification'],
    avatarUrl: 'https://i.pravatar.cc/150?u=admin@MEDiRAT.com',
  },
  'tech@MEDiRAT.com': {
    id: 'user-2',
    name: 'John Doe',
    email: 'tech@MEDiRAT.com',
    role: UserRole.Technician,
    permissions: ['view:dashboard', 'view:equipment', 'edit:equipment', 'acknowledge:notification'],
    avatarUrl: 'https://i.pravatar.cc/150?u=tech@MEDiRAT.com',
  },
  'staff@MEDiRAT.com': {
    id: 'user-3',
    name: 'Jane Smith',
    email: 'staff@MEDiRAT.com',
    role: UserRole.HospitalStaff,
    permissions: ['view:dashboard', 'view:equipment'],
    avatarUrl: 'https://i.pravatar.cc/150?u=staff@MEDiRAT.com',
  },
};


export interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  updateUser?: (updatedUser: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const login = async (email: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS[email.toLowerCase()];
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };


  const value = useMemo(() => ({
    user,
    login,
    logout,
    hasPermission,
    updateUser,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};