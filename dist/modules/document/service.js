"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudnary_config_1 = __importDefault(require("../../config/cloudnary.config"));
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
class DocumentServices {
    uploadDocument(_a) {
        return __awaiter(this, arguments, void 0, function* ({ modulId, purpose, fileType, file }) {
            try {
                const result = yield cloudnary_config_1.default.uploader.upload(file);
                yield prisma_config_1.default.document.create({
                    data: {
                        fileType: fileType,
                        modelId: modulId,
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
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const documentServices = new DocumentServices();
exports.default = documentServices;
