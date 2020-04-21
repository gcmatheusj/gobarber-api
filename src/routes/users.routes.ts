import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
