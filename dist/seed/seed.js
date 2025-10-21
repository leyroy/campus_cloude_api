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
const sead_1 = require("../constants/sead");
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
//clean up the database before seeding
function cleanDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🧹 Cleaning up the database...');
        yield prisma_config_1.default.user.deleteMany({});
        yield prisma_config_1.default.school.deleteMany({});
        yield prisma_config_1.default.planFeature.deleteMany({});
        yield prisma_config_1.default.plan.deleteMany({});
        yield prisma_config_1.default.role.deleteMany({});
        yield prisma_config_1.default.permission.deleteMany({});
    });
}
function seedPermissions() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const perm of sead_1.permissions) {
            const name = `${perm.resource}:${perm.action}`;
            yield prisma_config_1.default.permission.create({
                data: {
                    name,
                    action: perm.action,
                    resource: perm.resource,
                    description: `Allows ${perm.action} on ${perm.resource}`,
                },
            });
        }
        console.log('✅ Permissions seeded successfully!');
    });
}
function seedPlans() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const plan of sead_1.plans) {
            const created = yield prisma_config_1.default.plan.create({
                data: {
                    name: plan.name,
                    price: plan.price,
                    billingCycle: plan.billingCycle,
                    isActive: plan.isActive,
                    features: {
                        create: plan.features.map((f) => ({
                            name: f.name,
                            description: f.description,
                            isEnabled: f.isEnabled,
                            metadata: f.metadata,
                        })),
                    },
                    limits: {
                        create: Object.assign({}, plan.limits),
                    },
                },
            });
            console.log(`✅ Seeded plan: ${created.name}`);
        }
        console.log('🔥 All plans seeded!');
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield cleanDatabase();
        console.log('🧹 Database cleaned successfully!');
        return Promise.all([seedPermissions(), seedPlans()]);
    });
}
main()
    .catch((e) => {
    console.error('❌ Error seeding permissions', e);
    process.exit(1);
})
    .finally(() => {
    prisma_config_1.default.$disconnect();
});
