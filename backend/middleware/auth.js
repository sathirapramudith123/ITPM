import User from '../models/User.js';

export default async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  req.user = user;
  next();
};