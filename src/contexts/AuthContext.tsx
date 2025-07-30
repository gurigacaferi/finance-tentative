import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual Supabase auth check
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Simulate user data - replace with actual API call
          setUser({
            id: '1',
            email: 'user@example.com',
            name: 'John Doe',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            role: 'admin'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('auth_token', 'mock_token');
      setUser({
        id: '1',
        email,
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'admin'
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const loginWithOAuth = async (provider: 'google' | 'github') => {
    try {
      // TODO: Replace with actual Supabase OAuth
      // const { data, error } = await supabase.auth.signInWithOAuth({ provider });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('auth_token', 'mock_token');
      setUser({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'admin'
      });
    } catch (error) {
      throw new Error(`${provider} login failed`);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // TODO: Replace with actual Supabase registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('auth_token', 'mock_token');
      setUser({
        id: '1',
        email,
        name,
        role: 'user'
      });
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      // TODO: Replace with actual Supabase logout
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // TODO: Replace with actual Supabase password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      throw new Error('Password reset failed');
    }
  };

  const value = {
    user,
    loading,
    login,
    loginWithOAuth,
    register,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};