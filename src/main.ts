import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Setup global guard for JWT authentication
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  
  // Here, we're not using `app.use()` since guards are handled differently.
  app.useGlobalGuards(new JwtAuthGuard(jwtService, reflector));

  await app.listen(3000);
}
bootstrap();
