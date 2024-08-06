import type { INestApplication } from '@nestjs/common';

export function middleware(app: INestApplication): INestApplication {
  //  Add your middlewares here, I thought that it would be a good idea to separate the middlewares from the main file
  //  and initially tried to catch exceptions here, but that's not the NestJS style, so I moved it to the filters and left this file for middlewares only.
  //  You can add your middlewares here, like this:
  // app.use(middleware1);
  // app.use(middleware2);
  return app;
}
