import { Request, Response } from 'express';
import { commonDbService } from '../../utils/db/commonDbServices';
import { clearAuthenticationCookies } from '../../utils/cookie';
import { CustomRequest } from '../../types/types';
import { HTTPSTATUS } from '../../constants/http-status';

export async function logoutController(req: Request, res: Response) {
  const user = (req as CustomRequest).user;
  console.log('User logging out:', user);
  if (user && user.sessionId) {
    await commonDbService.deleteSession(user.sessionId);
  }

  clearAuthenticationCookies(res).status(HTTPSTATUS.OK).json({
    success: true,
    message: 'Logout successful',
  });
}
