import { Controller, Get, UseGuards,Request, Patch, Body, Put, Param} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProgressService } from './progress.service';
import { updateStepDto } from './dto/update-step.dto';
import { ParseIntPipe } from '@nestjs/common';
import { get } from 'http';


@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
 constructor(private progressService: ProgressService) {}
 
 @Get('me')
 getMyProgress(@Request() req){
    return this.progressService.findByUser(req.user.userId);
 }

 @Patch('step/:sorah')
 updateStep(@Request() req,@Param("sorah") sorah:number, @Body() dto:updateStepDto){
    return this.progressService.updateStep(req.user.userId, dto.step,sorah);
 }

 @Patch('aya/:sorah')
 nextAya(@Request() req ,@Param("sorah") sorah:number){
    return this.progressService.nextAya(req.user.userId,sorah);
 }

 @Get('dashboard')
 getDashboard(@Request() req){
    return this.progressService.getDashboard(req.user.userId);
 }

 @Put('complete-sorah/:sorah')
 completeSorah(@Request() req,@Param("sorah") sorah:number){
   return  this.progressService.completeSorah(req.user.userId,sorah)
 }

 @Get('admin')
 adminDashboard(@Request() req){
   return this.progressService.adminDashboard(req.user.userId);
 }

}
