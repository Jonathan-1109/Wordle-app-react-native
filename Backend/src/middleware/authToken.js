import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../config/config_env.js'

export const handleAuthToken =  (req,res,next)  => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Error'});
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Error' });
  }
}