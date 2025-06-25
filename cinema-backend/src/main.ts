import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_API_URL, // frontend React
  });
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();