"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const apollo_server_core_1 = require("apollo-server-core");
const throttler_1 = require("@nestjs/throttler");
const hostile = require("hostile");
const mikro_orm_config_1 = require("../mikro-orm.config");
const nestjs_1 = require("@mikro-orm/nestjs");
const tribe_module_1 = require("./tribe/tribe.module");
const chat_module_1 = require("./chat/chat.module");
const member_module_1 = require("./member/member.module");
const message_module_1 = require("./message/message.module");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const auth_guard_1 = require("./auth/auth.guard");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    async onModuleInit() {
        if (process.env.NODE_ENV === "development") {
            hostile.set("127.0.0.1", process.env.HOSTNAME);
        }
    }
    beforeApplicationShutdown() {
        if (process.env.NODE_ENV === "development") {
            hostile.remove("127.0.0.1", process.env.HOSTNAME);
        }
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forRoot(mikro_orm_config_1.default),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: "src/schema.graphql",
                sortSchema: true,
                playground: false,
                plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)()],
                subscriptions: {
                    "subscriptions-transport-ws": {
                        onConnect: (connectionParams) => {
                            return connectionParams;
                        },
                    },
                },
                cors: {
                    credentials: true,
                    origin: "*",
                },
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 60,
            }),
            tribe_module_1.TribeModule,
            chat_module_1.ChatModule,
            member_module_1.MemberModule,
            message_module_1.MessageModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map