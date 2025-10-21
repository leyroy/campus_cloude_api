"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const json_schema_json_1 = __importDefault(require("../prisma/schemas/json-schema.json"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management API aka Campus Cloude',
            description: 'API documentation for the School Management System',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: json_schema_json_1.default.definitions,
        },
    },
    apis: [
        './src/docs/**/*.ts',
        './src/docs/**/*.json',
        './src/prisma/**/*.json',
        './src/docs/**/*.ts', // Include schema definitions
        './src/routes/**/*.ts',
    ],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = specs;
