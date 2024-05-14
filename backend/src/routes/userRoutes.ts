import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  res.send('Hello users');
});

router.post('/users', (req, res) => {
  res.send('Hello Users');
});

export default router;
