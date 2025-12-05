import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'customer' | 'lawyer' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('nyayai_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setRole(parsed.role);
    }
  }, []);

  const login = async (email: string, password: string, loginRole: UserRole): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: `${loginRole}_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: loginRole,
      city: 'Bengaluru'
    };
    
    setUser(mockUser);
    setRole(loginRole);
    localStorage.setItem('nyayai_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (name: string, email: string, password: string, signupRole: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: `${signupRole}_${Date.now()}`,
      name,
      email,
      role: signupRole,
      city: 'Bengaluru'
    };
    
    setUser(mockUser);
    setRole(signupRole);
    localStorage.setItem('nyayai_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('nyayai_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
