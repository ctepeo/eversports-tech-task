import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AllExceptionsFilter } from './middlewares/exception.filter';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const httpAdapter: HttpAdapterHost = app.get(HttpAdapterHost);

  // Middlewares
  middleware(app);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Exceptions handler
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableShutdownHooks();
  await app.listen(process.env['APP_PORT'] || 3099, process.env['APP_HOST'] || '0.0.0.0');

  return app.getUrl();
}

void (async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();
