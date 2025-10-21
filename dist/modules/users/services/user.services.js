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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const errorHandler_1 = require("../../../middlewares/errorHandler");
const user_Helpres_1 = require("./user.Helpres");
class UserServices {
    constructor(userHelpers) {
        this.userHelpers = userHelpers;
    }
    getAuthUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userHelpers.getUserProfile(userId);
            const _a = user || {}, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
            const formatedUser = Object.assign(Object.assign({}, userWithoutPassword), { school: user === null || user === void 0 ? void 0 : user.school });
            if (!user) {
                throw errorHandler_1.ErrorHandler.notFound('User not found');
            }
            return formatedUser;
        });
    }
}
// role: user?.userRoles
//   .map((role) => role.role.rolePermissions)
//   .flat()
//   .map((permission) => permission.permission),
exports.userServices = new UserServices(new user_Helpres_1.UserHelpers());
