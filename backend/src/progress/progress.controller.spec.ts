import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockReq = { user: { userId: 'user-id-123' } };

const mockProgressService = {
  findByUser: jest.fn(),
  updateStep: jest.fn(),
  nextAya: jest.fn(),
  getDashboard: jest.fn(),
  completeSorah: jest.fn(),
  adminDashboard: jest.fn(),
};

// ── Test Suite ────────────────────────────────────────────────────────────────

describe('ProgressController', () => {
  let controller: ProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [
        { provide: ProgressService, useValue: mockProgressService },
      ],
    })
      // Override the guard so it never blocks in unit tests
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ProgressController>(ProgressController);
    jest.clearAllMocks();
  });

  // ── GET /progress/me ───────────────────────────────────────────────────────

  describe('getMyProgress()', () => {
    it('should call progressService.findByUser with the userId and return the result', async () => {
      const mockProgress = { userId: 'user-id-123', steps: [] };
      mockProgressService.findByUser.mockResolvedValue(mockProgress);

      const result = await controller.getMyProgress(mockReq);

      expect(mockProgressService.findByUser).toHaveBeenCalledWith('user-id-123');
      expect(result).toEqual(mockProgress);
    });

    it('should propagate errors thrown by progressService.findByUser', async () => {
      mockProgressService.findByUser.mockRejectedValue(new Error('Not found'));

      await expect(controller.getMyProgress(mockReq)).rejects.toThrow('Not found');
    });
  });

  // ── PATCH /progress/step/:sorah ────────────────────────────────────────────

  describe('updateStep()', () => {
    it('should call progressService.updateStep with userId, step, and sorah', async () => {
      const dto = { step: 3 };
      const mockResult = { updated: true };
      mockProgressService.updateStep.mockResolvedValue(mockResult);

      const result = await controller.updateStep(mockReq, 2, dto);

      expect(mockProgressService.updateStep).toHaveBeenCalledWith('user-id-123', 3, 2);
      expect(result).toEqual(mockResult);
    });

    it('should propagate errors thrown by progressService.updateStep', async () => {
      mockProgressService.updateStep.mockRejectedValue(new Error('Update failed'));

      await expect(controller.updateStep(mockReq, 2, { step: 1 })).rejects.toThrow(
        'Update failed',
      );
    });
  });

  // ── PATCH /progress/aya/:sorah ─────────────────────────────────────────────

  describe('nextAya()', () => {
    it('should call progressService.nextAya with userId and sorah', async () => {
      const mockResult = { aya: 5 };
      mockProgressService.nextAya.mockResolvedValue(mockResult);

      const result = await controller.nextAya(mockReq, 3);

      expect(mockProgressService.nextAya).toHaveBeenCalledWith('user-id-123', 3);
      expect(result).toEqual(mockResult);
    });

    it('should propagate errors thrown by progressService.nextAya', async () => {
      mockProgressService.nextAya.mockRejectedValue(new Error('Aya error'));

      await expect(controller.nextAya(mockReq, 3)).rejects.toThrow('Aya error');
    });
  });

  // ── GET /progress/dashboard ────────────────────────────────────────────────

  describe('getDashboard()', () => {
    it('should call progressService.getDashboard with userId and return the result', async () => {
      const mockDashboard = { totalSorahs: 10, completed: 3 };
      mockProgressService.getDashboard.mockResolvedValue(mockDashboard);

      const result = await controller.getDashboard(mockReq);

      expect(mockProgressService.getDashboard).toHaveBeenCalledWith('user-id-123');
      expect(result).toEqual(mockDashboard);
    });

    it('should propagate errors thrown by progressService.getDashboard', async () => {
      mockProgressService.getDashboard.mockRejectedValue(new Error('Dashboard error'));

      await expect(controller.getDashboard(mockReq)).rejects.toThrow('Dashboard error');
    });
  });

  // ── PUT /progress/complete-sorah/:sorah ────────────────────────────────────

  describe('completeSorah()', () => {
    it('should call progressService.completeSorah with userId and sorah', async () => {
      const mockResult = { completed: true };
      mockProgressService.completeSorah.mockResolvedValue(mockResult);

      const result = await controller.completeSorah(mockReq, 5);

      expect(mockProgressService.completeSorah).toHaveBeenCalledWith('user-id-123', 5);
      expect(result).toEqual(mockResult);
    });

    it('should propagate errors thrown by progressService.completeSorah', async () => {
      mockProgressService.completeSorah.mockRejectedValue(new Error('Complete failed'));

      await expect(controller.completeSorah(mockReq, 5)).rejects.toThrow('Complete failed');
    });
  });

  // ── GET /progress/admin ────────────────────────────────────────────────────

  describe('adminDashboard()', () => {
    it('should call progressService.adminDashboard with userId and return the result', async () => {
      const mockAdmin = { users: [], totalProgress: 80 };
      mockProgressService.adminDashboard.mockResolvedValue(mockAdmin);

      const result = await controller.adminDashboard(mockReq);

      expect(mockProgressService.adminDashboard).toHaveBeenCalledWith('user-id-123');
      expect(result).toEqual(mockAdmin);
    });

    it('should propagate errors thrown by progressService.adminDashboard', async () => {
      mockProgressService.adminDashboard.mockRejectedValue(new Error('Admin error'));

      await expect(controller.adminDashboard(mockReq)).rejects.toThrow('Admin error');
    });
  });
});