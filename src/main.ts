import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  console.log(
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRATION,"expiration"
  );
  
}
bootstrap();
