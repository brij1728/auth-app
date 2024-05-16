import { Router } from 'express';
import { getUsers } from '../controllers';

const router = Router();

router.get('/', getUsers);

router.post('/', (req, res) => {
  res.send('Hello Users');
});

export default router;
