import { createUser, getAllUsers, getUserById } from '../controllers';

import { Router } from 'express';
import { isAuthenticated } from '../middlewares';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/:id', getUserById);

router.post('/', createUser);

export default router;
