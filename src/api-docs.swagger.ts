import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Fudy Api Roman Test Assignment')
    .setDescription('Fudy Api Roman API description')
    .setVersion('1.0')
    .addBearerAuth({'type': 'http', 'bearerFormat': 'JWT'})
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}
