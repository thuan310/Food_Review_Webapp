import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
  .setTitle('Restaurant API')
  .setDescription('The Restaurant API description')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat:'JWT',
    name: 'JWT',
    description: 'Enter your Bearer token',
    in: 'header',
  },
  'JWT-auth',)
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Middleware
  app.use(helmet());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false },
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));  
  await app.listen(port, configService.get('HOST'));
}
bootstrap();