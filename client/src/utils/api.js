export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Google OAuth
  googleAuth: async (credential) => {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });
    return response.json();
  },

  // Get current user
  getMe: async (token) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Update profile
  updateProfile: async (token, data) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Logout
  logout: async (token) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Auth helpers
export const authHelpers = {
  // Store token and user in localStorage
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Clear auth data (logout)
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Chat API calls
export const chatAPI = {
  // Create a new chat
  createChat: async (token, name, participants = []) => {
    const response = await fetch(`${API_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, participants }),
    });
    return response.json();
  },

  // Get all chats for the user
  getChats: async (token) => {
    const response = await fetch(`${API_URL}/chats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Get a specific chat
  getChat: async (token, chatId) => {
    const response = await fetch(`${API_URL}/chats/${chatId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Send a message to a chat
  sendMessage: async (token, chatId, text, senderType = 'user') => {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text, senderType }),
    });
    return response.json();
  },

  // Get messages from a chat
  getChatMessages: async (token, chatId) => {
    const response = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Delete a chat
  deleteChat: async (token, chatId) => {
    const response = await fetch(`${API_URL}/chats/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Rename a chat
  renameChat: async (token, chatId, name) => {
    const response = await fetch(`${API_URL}/chats/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  },
};
