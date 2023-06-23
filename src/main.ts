import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{
      host: 'localhost',
      port: 4200
    }
  })
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
      })
  );
  await app.startAllMicroservices()
  await app.listen(4200);
  console.log(`App is running on port ${await app.getUrl()}`)
}
bootstrap();