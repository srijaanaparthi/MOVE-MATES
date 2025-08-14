import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import apiService, { User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signup: (data: { name: string; role: 'student' | 'tutor'; email?: string }) => Promise<void>;
  login: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
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
  const { connected, account } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user exists when wallet connects
  useEffect(() => {
    if (connected && account?.address) {
      checkUserExists();
    } else {
      setUser(null);
    }
  }, [connected, account?.address]);

  const checkUserExists = async () => {
    if (!account?.address) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.getUserProfile(account.address.toString());
      if (response.success) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: { name: string; role: 'student' | 'tutor'; email?: string }) => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.signup({
        walletAddress: account.address.toString(),
        ...data,
      });

      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.login({
        walletAddress: account.address.toString(),
      });

      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user?.walletAddress) {
      throw new Error('User not authenticated');
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await apiService.updateUserProfile(user.walletAddress, data);

      if (response.success) {
        setUser(response.data);
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
