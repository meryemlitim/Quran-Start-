import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/role.enum';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  const user = await this.usersService.create(dto);
  return this.login(user);
}

async login(user: any) {
  const payload = {
    sub: user._id,
    email: user.email,
    role: user.role,
    childName: user.childName,
  };

  return {
    access_token: this.jwtService.sign(payload),
    user: {
      id: user._id,
      parentName: user.parentName,
      email: user.email,
      role: user.role,
      childName: user.childName,
      childAge: user.childAge,
    },
  };
}

async validateUser(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  if (!user || !user.isActive) throw new UnauthorizedException('Invalid credentials');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new UnauthorizedException('Invalid credentials');
  return user;
}

async getProfile(userId: string) {
  return this.usersService.findById(userId);
}
}