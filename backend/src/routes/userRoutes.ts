import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers';
import { isAuthenticated, isOwner } from '../middlewares';

import { Router } from 'express';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', isAuthenticated, isOwner, deleteUser);
router.put('/:id', isAuthenticated, isOwner, updateUser);

router.post('/', isAuthenticated, isOwner, createUser);

export default router;
