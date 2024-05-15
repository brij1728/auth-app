import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello users');
});

router.post('/', (req, res) => {
  res.send('Hello Users');
});

export default router;
