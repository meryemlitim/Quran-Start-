import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockAuthResponse = {
  access_token: 'signed-jwt-token',
  user: {
    id: 'user-id-123',
    parentName: 'Alice',
    email: 'parent@test.com',
    role: 'parent',
    childName: 'Bob',
    childAge: 8,
  },
};

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
};

// ── Test Suite ────────────────────────────────────────────────────────────────

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  // ── POST /auth/register ────────────────────────────────────────────────────

  describe('register()', () => {
    const dto: RegisterDto = {
      email: 'parent@test.com',
      password: 'secret',
      parentName: 'Alice',
      childName: 'Bob',
      phoneNumber:"0600000000",
      childAge: 8,
    };

    it('should call authService.register with the DTO and return the result', async () => {
      mockAuthService.register.mockResolvedValue(mockAuthResponse);

      const result = await controller.register(dto);

      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAuthResponse);
    });

    it('should propagate errors thrown by authService.register', async () => {
      mockAuthService.register.mockRejectedValue(new Error('Email already exists'));

      await expect(controller.register(dto)).rejects.toThrow('Email already exists');
    });
  });

  // ── POST /auth/login ───────────────────────────────────────────────────────

  describe('login()', () => {
    it('should call authService.login with req.user and return the result', async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      // LocalAuthGuard attaches the validated user to req.user
      const req = { user: { _id: 'user-id-123', email: 'parent@test.com' } };

      const result = await controller.login(req);

      expect(mockAuthService.login).toHaveBeenCalledWith(req.user);
      expect(result).toEqual(mockAuthResponse);
    });

    it('should propagate errors thrown by authService.login', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Login failed'));

      await expect(controller.login({ user: {} })).rejects.toThrow('Login failed');
    });
  });

  // ── GET /auth/me ───────────────────────────────────────────────────────────

  describe('getProfile()', () => {
    it('should call authService.getProfile with the userId from the JWT payload', async () => {
      const profile = { id: 'user-id-123', email: 'parent@test.com' };
      mockAuthService.getProfile.mockResolvedValue(profile);

      // JwtAuthGuard decodes the token and attaches { userId, ... } to req.user
      const req = { user: { userId: 'user-id-123' } };

      const result = await controller.getProfile(req);

      expect(mockAuthService.getProfile).toHaveBeenCalledWith('user-id-123');
      expect(result).toEqual(profile);
    });

    it('should propagate errors thrown by authService.getProfile', async () => {
      mockAuthService.getProfile.mockRejectedValue(new Error('User not found'));

      await expect(controller.getProfile({ user: { userId: 'bad-id' } })).rejects.toThrow(
        'User not found',
      );
    });
  });
});