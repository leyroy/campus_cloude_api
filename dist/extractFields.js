"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/extractFields.ts
const fs_1 = require("fs");
const prisma_schema_parser_1 = require("@loancrate/prisma-schema-parser");
const schemaPath = './prisma/schema.prisma';
const schema = (0, fs_1.readFileSync)(schemaPath, 'utf-8');
const parsedSchema = (0, prisma_schema_parser_1.parsePrismaSchema)(schema);
const extractModels = (data = { declarations: [] }) => {
    var _a;
    (0, fs_1.writeFileSync)('./src/generatedSchema.json', JSON.stringify(data, null, 2));
    return (_a = data.declarations) === null || _a === void 0 ? void 0 : _a.map(model => {
        if (model.name) {
            const modelName = model.name.value;
            const fields = model.members
                .filter(member => {
                var _a;
                if (member.type && member.type.kind && member.type.kind === 'list') {
                    return false;
                }
                if ((member === null || member === void 0 ? void 0 : member.attributes) &&
                    ((_a = member === null || member === void 0 ? void 0 : member.attributes) === null || _a === void 0 ? void 0 : _a.some(attr => { var _a, _b; return (_b = (_a = attr === null || attr === void 0 ? void 0 : attr.path) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.includes('relation'); }))) {
                    return false;
                }
                // if (member.attributes && member.attributes.length > 0) return false;
                return true;
            })
                .map(member => { var _a; return ((_a = member === null || member === void 0 ? void 0 : member.name) === null || _a === void 0 ? void 0 : _a.value) || ''; })
                .filter(Boolean);
            return {
                modelName,
                fields
            };
        }
        else {
            return {
                modelName: '',
                fields: []
            };
        }
    });
};
const allowedFields = extractModels(parsedSchema);
(0, fs_1.writeFileSync)('./src/allowedFields.json', JSON.stringify(allowedFields, null, 2));
(0, fs_1.writeFileSync)('./src/generatedSchema.json', JSON.stringify(parsedSchema, null, 2));
