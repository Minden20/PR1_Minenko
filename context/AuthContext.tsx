import React, { createContext, useContext, useState, ReactNode } from 'react';

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
};

// Harcoded mocked users
const FAKE_USERS: User[] = [
  { id: '1', username: 'admin', name: 'Системний Адміністратор', email: 'admin@islands.com', role: 'Admin' },
  { id: '2', username: 'user', name: 'Користувач', email: 'user@islands.com', role: 'Explorer' },
];

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${username}`);

      if (response.ok) {
        const data = await response.json();
        
        if (data && data.length > 0) {
          const apiUser = data[0];
          setUser({
            id: apiUser.id.toString(),
            username: apiUser.username,
            name: apiUser.name,
            email: apiUser.email,
            role: 'Explorer',
          });
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
