import { Router } from 'express';
// import { Request, Response, NextFunction } from 'express';
import { deleteProfile, getAllUsers, getProfile, updateProfile } from '../../controllers/user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';



const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.get('/all', authMiddleware, getAllUsers);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile);


export default router;
