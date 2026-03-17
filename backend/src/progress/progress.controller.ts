import { Controller, Get, UseGuards,Request} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProgressService } from './progress.service';


@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
 constructor(private progressService: ProgressService) {}
 
 @Get('me')
 getMyProgress(@Request() req){
    return this.progressService.findByUser(req.user.userId);
 }


}
