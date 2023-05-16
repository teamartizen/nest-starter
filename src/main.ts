import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { showRoutes, isDevelopment } from './lib/global';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

const { PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();

  await app.listen(PORT, async () => {
    console.log(`Server started at: http://localhost:${PORT}`);

    if (isDevelopment()) {
      showRoutes(app);
    }
  });
}

bootstrap();
