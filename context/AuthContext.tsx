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
    // Fake auth delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Simplistic auth check (in real app, compare passwords securely)
    const foundUser = FAKE_USERS.find(u => u.username === username);
    
    // We accept any password for valid usernames, or we could strict check:
    // For our mockup, password must equal 'password' for demo purposes, or matching username.
    if (foundUser && (password === '123456' || password === foundUser.username)) {
      setUser(foundUser);
      return true;
    }
    return false;
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
