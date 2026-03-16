import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get(getModelToken(User.name));

  const existing = await userModel.findOne({ role: Role.ADMIN });
  if (existing) {
    console.log('✅ Admin already exists, skipping...');
    await app.close();
    return;
  }

  const hashed = await bcrypt.hash('admin123', 10);
  await userModel.create({
    parentName: 'Super Admin',
    email: 'admin@quranstart.com',
    password: hashed,
    role: Role.ADMIN,
    childName: 'N/A',
    childAge: 0,
    phoneNumber: '+00000000000',
    isActive: true,
  });

  console.log('✅ Admin created successfully!');
  console.log('📧 Email: admin@quranstart.com');
  console.log('🔑 Password: admin123');

  await app.close();
}

seedAdmin().catch((err) => {
  console.error('❌ Seeder failed:', err);
  process.exit(1);
});