import { Request, Response, NextFunction } from 'express';
import documentServices from './service';

const uploadDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file ? req.file.path : null;
  const { moduleId } = req.params as { moduleId: string };
  if (!file) {
    return next(new Error('No file uploaded'));
  }
  const result = await documentServices.uploadDocument(moduleId, file);
  console.log(result);
  res.status(200).json({ success: true, message: 'Uploaded successfully' });
};

export default uploadDocumentController;
