import { Controller, Get, UseGuards,Request, Patch, Body} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QuranService } from './quran.service';


@Controller('quran')
export class QuranController {
 constructor(private progressService: QuranService) {}
 
 @Get('hizbs')
 getHizbs(){
    return this.progressService.getHizbs();
 }

}
