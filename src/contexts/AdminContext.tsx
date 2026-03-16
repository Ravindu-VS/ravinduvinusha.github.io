import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Hash function for password verification (simple SHA-256)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Store your hashed admin password here
// To generate your own hash: console.log(await hashPassword('your-password'))
const ADMIN_PASSWORD_HASH = 'edfebbdf25eb84b300ac9e08bc36dc9fb4ed3b72e79277a40ee8de2d528f03dd';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('admin_session');
    if (session) {
      const { expiry } = JSON.parse(session);
      if (new Date().getTime() < expiry) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const hashedInput = await hashPassword(password);
    
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      // Set session for 24 hours
      const session = {
        authenticated: true,
        expiry: new Date().getTime() + 24 * 60 * 60 * 1000
      };
      localStorage.setItem('admin_session', JSON.stringify(session));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
