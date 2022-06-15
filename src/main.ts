import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { configMain } from './config/configMain';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('nest')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('sep-2021')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const { PORT } = configMain;

  await app.listen(PORT, async () => {
    console.log(`Server has started on Port:${PORT}!!!!`);
  });
}
bootstrap();
