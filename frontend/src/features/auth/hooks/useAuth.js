import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const userData = { email, name: 'John Doe' };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, loading, error, login, logout };
};
