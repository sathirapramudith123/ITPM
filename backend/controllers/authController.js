import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  req.session.userId = user._id;
  res.status(201).json({ message: 'User registered', user: { email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  req.session.userId = user._id;
  res.json({ message: 'Logged in', user: { email, role: user.role } });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
};

export const getCurrentUser = (req, res) => {
  res.json({ user: { email: req.user.email, role: req.user.role } });
};