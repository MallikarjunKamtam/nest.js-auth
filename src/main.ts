import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['asdfasfd'],
    }),
  );

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
