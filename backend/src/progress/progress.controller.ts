import { Controller, Get, UseGuards,Request, Patch, Body} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProgressService } from './progress.service';
import { updateStepDto } from './dto/update-step.dto';


@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
 constructor(private progressService: ProgressService) {}
 
 @Get('me')
 getMyProgress(@Request() req){
    return this.progressService.findByUser(req.user.userId);
 }

 @Patch('step')
 updateStep(@Request() req, @Body() dto:updateStepDto){
    return this.progressService.updateStep(req.user.userId, dto.step);
 }

 @Patch('aya')
 nextAya(@Request() req){
    return this.progressService.nextAya(req.user.userId);
 }

 @Get('dashboard')
 getDashboard(@Request() req){
    return this.progressService.getDashboard(req.user.userId);
 }

}
