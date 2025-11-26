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
const service_1 = __importDefault(require("./service"));
const uploadDocumentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file ? req.file.path : null;
    const { modulId } = req.params;
    const { purpose, fileType } = req.body;
    if (!file) {
        return next(new Error('No file uploaded'));
    }
    const result = yield service_1.default.uploadDocument({
        modulId,
        purpose,
        fileType,
        file,
    });
    console.log('working now');
    res.status(200).json({ success: true, message: 'Uploaded successfully', data: result });
});
exports.default = uploadDocumentController;
