import { createUser, getAllUsers, getUserById } from '../controllers';

import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

router.post('/', createUser);

export default router;
