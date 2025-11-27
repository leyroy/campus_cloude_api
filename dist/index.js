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
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = require("./middlewares/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Import routes
const routes_1 = __importDefault(require("./routes"));
const prisma_config_1 = __importDefault(require("./config/prisma.config"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const commonDbServices_1 = require("./utils/db/commonDbServices");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const errorHandler = new errorHandler_1.ErrorHandler();
//Middlware configuration
app.use(express_1.default.json());
//TODO: add more cookie parser options for security
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ['https://campus-cloude.vercel.app', 'http://localhost:3000'],
    credentials: true,
}));
dotenv_1.default.config();
errorHandler.setupGlobalHandlers();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.use('/campcloud/api/v1', routes_1.default);
app.get('/campcloud/api/v1/create-admin-role', (req, res, next) => {
    commonDbServices_1.commonDbService
        .assignAllPermissionsToSuperAdmin()
        .then(() => {
        res.status(201).json({ message: 'Admin role created successfully' });
    })
        .catch((error) => {
        next(error);
    });
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'Welcome to the Express server!' });
}));
app.use(errorHandler.handleError);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_config_1.default.$disconnect();
    process.exit(0);
}));
