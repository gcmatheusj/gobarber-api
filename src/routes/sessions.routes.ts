import { Router } from 'express';

import AuthencicateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthencicateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
