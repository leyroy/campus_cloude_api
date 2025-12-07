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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolHelpers = exports.SchoolHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
class SchoolHelpers {
    constructor() {
        this.getSchoolByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            const school = yield prisma_config_1.default.school.findFirst({
                where: {
                    users: {
                        some: { id: userId },
                    },
                },
                include: {
                    owner: true,
                    users: true,
                    schoolProfile: true,
                },
            });
            return school;
        });
    }
    createSchoolOwner(data, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_config_1.default.owner.create({
                data: Object.assign(Object.assign({}, data), { isActive: true }),
            });
        });
    }
    createSchoolProfile(data, schoolId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_config_1.default.schoolProfile.create({
                data: Object.assign(Object.assign({}, data), { schoolId: schoolId, about: 'Some jobs ', principalBio: '', principalName: '', updatedById: userId, description: data.description, founderBio: 'Some information', founderName: data.founderName, licenseNumber: data.licenseNumber, slogan: data.slogan, adminNote: data.adminNote }),
            });
        });
    }
    configureSchoole(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = data.schoolProfile, { name } = _a, schoolProfileData = __rest(_a, ["name"]), { owner, schoolAddress } = data;
            return yield prisma_config_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const newOwner = yield tx.owner.create({
                    data: Object.assign({}, owner),
                });
                const newSchool = yield tx.school.create({
                    data: {
                        name: name || '',
                        updatedById: userId,
                        description: schoolProfileData.description,
                        level: 3,
                        ownerId: newOwner.id,
                        educationLevel: data.schoolProfile.level,
                    },
                });
                yield tx.user.update({
                    where: { id: userId },
                    data: { schoolId: newSchool.id },
                });
                const { level } = schoolProfileData, res = __rest(schoolProfileData, ["level"]);
                const profile = yield tx.schoolProfile.create({
                    data: Object.assign(Object.assign({}, res), { schoolId: newSchool.id, about: 'Some jobs ', principalBio: '', principalName: '', updatedById: userId, contactEmail: res.contactEmail, motto: res.motto, description: res.description, founderBio: res.founderBio, founderName: res.founderName, licenseNumber: res.licenseNumber, slogan: res.slogan, adminNote: res.adminNote }),
                });
                const address = yield tx.address.create({
                    data: Object.assign(Object.assign({}, schoolAddress), { userId: userId }),
                });
                return { newSchool, newOwner, profile, address };
            }));
        });
    }
    createSchoolAddress(data, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_config_1.default.address.create({
                data: Object.assign(Object.assign({}, data), { schoolProfile: {
                        connect: { id: schoolId },
                    } }),
            });
        });
    }
    updateSchool(schoolId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_config_1.default.school.update({
                where: { id: schoolId },
                data,
            });
        });
    }
    deleteSchool(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_config_1.default.school.delete({
                where: { id: schoolId },
            });
        });
    }
}
exports.SchoolHelpers = SchoolHelpers;
exports.schoolHelpers = new SchoolHelpers();
