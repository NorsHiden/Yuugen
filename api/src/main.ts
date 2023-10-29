import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = new ConfigService();
  app.setGlobalPrefix('/api');
  app.use(morgan('dev'));
  app.use(cookieParser());
  await app.listen(configService.get('PORT') || 3000, () =>
    console.log(`Listening on port ${configService.get('PORT') || 3000}`),
  );
}
bootstrap();
