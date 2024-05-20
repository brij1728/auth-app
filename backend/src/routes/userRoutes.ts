import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares';

import { Router } from 'express';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', isAuthenticated, isOwner, deleteUser);
router.put('/:id', isAuthenticated, isOwner, deleteUser);

router.post('/', createUser);

export default router;
