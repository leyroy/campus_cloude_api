import { Request, Response } from 'express';
import { commonDbService } from '../../utils/db/commonDbServices';
import { clearAuthenticationCookies } from '../../utils/cookie';
import { CustomRequest } from '../../types/types';

export async function logoutController(req: Request, res: Response) {
  const user = (req as CustomRequest).user;
  console.log('User logging out:', user);
  await commonDbService.deleteSession(user.sessionId);

  clearAuthenticationCookies(res).status(200).json({
    success: true,
    message: 'Logout successful',
    user,
  });
}
