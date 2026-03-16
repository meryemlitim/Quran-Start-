import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
register(@Body() dto: RegisterDto) {
  return this.authService.register(dto);
}

@UseGuards(LocalAuthGuard)
@Post('login')
login(@Request() req) {
  return this.authService.login(req.user);
}

@UseGuards(JwtAuthGuard)
@Get('me')
getProfile(@Request() req) {
  return this.authService.getProfile(req.user.userId);
}

}