import { Request, Response, NextFunction } from 'express';
import documentServices from './service';
import { DocPurpose, FileType } from '@prisma/client';

const uploadDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file ? req.file.path : null;
  const { modulId } = req.params as { modulId: string };
  const { purpose, fileType } = req.body as { purpose: DocPurpose; fileType: FileType };
  if (!file) {
    return next(new Error('No file uploaded'));
  }
  const result = await documentServices.uploadDocument({
    modulId,
    purpose,
    fileType,
    file,
  });
  console.log('working now');
  res.status(200).json({ success: true, message: 'Uploaded successfully', data: result });
};

export default uploadDocumentController;
