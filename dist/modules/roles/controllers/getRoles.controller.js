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
const getRoles_1 = require("../helpers/getRoles");
const getRolesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield (0, getRoles_1.getRoles)();
        res.status(200).json({ message: 'getRolesController is live 🧨', roles: roles });
    }
    catch (err) {
        next(err);
    }
});
exports.default = getRolesController;
