import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import "reflect-metadata";
import {NestExpressApplication} from "@nestjs/platform-express";

import {join} from 'path';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname,'..','public'));
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.setViewEngine('pug');
  //const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
