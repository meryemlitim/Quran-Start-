import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('🚀 Starting app...');
  console.log('🔗 MongoDB URI:', process.env.MONGODB_URI);
  
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  await app.listen(3000);
  console.log('✅ App running on http://localhost:3000');
}

bootstrap().catch((err) => {
  console.error('❌ Error starting app:', err);
  process.exit(1);
});