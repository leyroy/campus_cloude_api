import { FileType } from '@prisma/client';
import cloudinary from '../../config/cloudnary.config';
import prisma from '../../config/prisma.config';

class DocumentServices {
  public async uploadDocument(moduleId: string, file: string) {
    try {
      const result = await cloudinary.uploader.upload(file);
      await prisma.document.create({
        data: {
          fileType: FileType.IMAGE,
          mudelId: moduleId,
          purpose: 'GENERAL_UPLOAD',
          url: result.secure_url,
          documentKey: result.public_id,
        },
      });
      return {
        success: true,
        message: 'Uploaded successfully',
        data: {
          documentKey: result.public_id,
          documentUrl: result.secure_url,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

const documentServices = new DocumentServices();
export default documentServices;
