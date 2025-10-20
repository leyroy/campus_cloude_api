import { DocPurpose, FileType } from '@prisma/client';
import cloudinary from '../../config/cloudnary.config';
import prisma from '../../config/prisma.config';

interface CreateDocumentTypes {
  moduleId: string;
  purpose: DocPurpose;
  fileType: FileType;
  file: string;
}
class DocumentServices {
  public async uploadDocument({
    moduleId,
    purpose,
    fileType,
    file,
  }: CreateDocumentTypes) {
    try {
      const result = await cloudinary.uploader.upload(file);
      await prisma.document.create({
        data: {
          fileType: fileType,
          mudelId: moduleId,
          purpose: purpose,
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
