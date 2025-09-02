// Mock user database
const mockUsers = [
  {
    id: 1,
    email: 'admin@studyabroad.com',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin',
  },
  {
    id: 2,
    email: 'counselor@studyabroad.com',
    password: 'counselor123',
    name: 'Sarah Johnson',
    role: 'counselor',
  },
  {
    id: 3,
    email: 'employee@studyabroad.com',
    password: 'employee123',
    name: 'Mike Chen',
    role: 'employee',
  },
];

// Simple JWT-like token generation (for demo purposes)
const generateToken = (user) => {
  return `token_${user.id}_${Date.now()}`;
};

// Mock token storage (in production, use proper JWT and Redis/DB)
const activeTokens = new Map();

export const handleLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Find user by email and password
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user);
    
    // Store token (in production, use proper session management)
    activeTokens.set(token, {
      userId: user.id,
      user: { ...user, password: undefined }, // Remove password from response
      createdAt: new Date(),
    });

    // Return user data without password
    const userData = { ...user };
    delete userData.password;

    res.json({
      token,
      user: userData,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleVerifyToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const tokenData = activeTokens.get(token);

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Check if token is expired (24 hours)
    const now = new Date();
    const tokenAge = now - tokenData.createdAt;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (tokenAge > maxAge) {
      activeTokens.delete(token);
      return res.status(401).json({ message: 'Token expired' });
    }

    res.json({
      user: tokenData.user,
      message: 'Token valid'
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleLogout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      activeTokens.delete(token);
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
