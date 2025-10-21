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
Object.defineProperty(exports, "__esModule", { value: true });
const school_helpers_1 = require("./school.helpers");
const commonDbServices_1 = require("../../../utils/db/commonDbServices");
const errorHandler_1 = require("../../../middlewares/errorHandler");
class SchoolServices {
    constructor(schoolHelpers, commonDbServices) {
        this.schoolHelpers = schoolHelpers;
        this.commonDbServices = commonDbServices;
    }
    createSchoolProfile(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.commonDbServices.getUserById(userId);
            if (!user) {
                throw errorHandler_1.ErrorHandler.notFound('User not found');
            }
            const results = yield this.schoolHelpers.configureSchoole(data, userId);
            if (!results) {
                throw errorHandler_1.ErrorHandler.internal('Error occured. Failed to configure school');
            }
            return {
                success: true,
                message: 'School created successfully, please wait for admin approval',
            };
        });
    }
    getSchoolByUserID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const school = yield this.schoolHelpers.getSchoolByUserId(userId);
            if (!school) {
                throw errorHandler_1.ErrorHandler.notFound('School not found');
            }
            return {
                success: true,
                data: school,
            };
        });
    }
    updateSchoolInfo(schoolId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSchool = yield this.schoolHelpers.updateSchool(schoolId, data);
            if (!updatedSchool) {
                throw errorHandler_1.ErrorHandler.internal('Error occurred. Failed to update school information');
            }
            return {
                success: true,
                message: 'School information updated successfully',
            };
        });
    }
    deleteSchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.schoolHelpers.deleteSchool(schoolId);
            return {
                success: true,
                message: 'School was deleted successfully',
            };
        });
    }
}
const schoolServices = new SchoolServices(school_helpers_1.schoolHelpers, commonDbServices_1.commonDbService);
exports.default = schoolServices;
