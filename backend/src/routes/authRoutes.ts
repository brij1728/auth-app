import { login, signup } from '../controllers';

import { Router } from 'express';

const router = Router();

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

// User logout
router.post('/logout', (req, res) => {
  res.send('User logout');
});

export default router;
