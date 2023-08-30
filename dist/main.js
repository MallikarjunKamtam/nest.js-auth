"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const cookieSession = require('cookie-session');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieSession({
        keys: ['asdfasfd'],
    }));
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT');
    await app.listen(port, () => {
        console.log('[WEB]', config.get('BASE_URL'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map