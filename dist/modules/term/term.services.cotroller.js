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
exports.termControllers = void 0;
const term_services_1 = require("./helpers/term.services");
const errorHandler_1 = require("../../middlewares/errorHandler");
const http_status_1 = require("../../constants/http-status");
class TermControllersServices {
    constructor(termServices) {
        //create term controller
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { schoolId, userId } = req.user;
            const termData = req.body;
            if (!schoolId || !userId) {
                throw errorHandler_1.ErrorHandler.unauthorized();
            }
            const term = this.termServices.createTerm(Object.assign(Object.assign({}, termData), { schoolId: schoolId, userId: userId }));
            res.status(200).json(term);
        });
        //update term controller
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { schoolId, userId } = req.user;
            const termData = req.body;
            const { id } = req.params;
            if (!schoolId || !userId || id) {
                throw errorHandler_1.ErrorHandler.unauthorized();
            }
            const updatedTerm = yield this.termServices.updateTerm({ id, data: termData });
            res.status(http_status_1.HTTPSTATUS.OK).json(Object.assign({}, updatedTerm));
        });
        //function to retrieve all terms by school id
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { schoolId, userId } = req.user;
            const { id } = req.params;
            if (!schoolId || !userId || id) {
                throw errorHandler_1.ErrorHandler.unauthorized();
            }
            const deletedTerm = yield this.termServices.deleteTerm(id);
            res.status(http_status_1.HTTPSTATUS.ACCEPTED).json(Object.assign({}, deletedTerm));
        });
        //TODO:
        this.getTermBySchoolId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { schoolId, userId } = req.user;
            const { id } = req.params;
            if (!schoolId || !userId || id) {
                throw errorHandler_1.ErrorHandler.unauthorized();
            }
            const term = yield this.termServices.getTermBySchoolId(id, schoolId);
            res.status(http_status_1.HTTPSTATUS.ACCEPTED).json(Object.assign({}, term));
        });
        //all terms by school id
        this.getAllTermsBySchoolId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { schoolId, userId } = req.user;
            const { id } = req.params;
            if (!schoolId || !userId || id) {
                throw errorHandler_1.ErrorHandler.unauthorized();
            }
            const terms = yield this.termServices.getAllTermsBySchoolId(id, schoolId);
            res.status(http_status_1.HTTPSTATUS.OK).json(Object.assign({}, terms));
        });
        this.termServices = termServices;
    }
}
exports.termControllers = new TermControllersServices(term_services_1.termService);
