import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  console.log('ENVIRONMENT:', process.env.ENVIRONMENT);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Fintrack API')
    .setDescription('API for fintrack application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
