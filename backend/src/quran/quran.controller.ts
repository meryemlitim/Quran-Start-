import { Controller, Get, UseGuards,Request, Patch, Body, Param} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QuranService } from './quran.service';


@Controller('quran')
export class QuranController {
 constructor(private quranService: QuranService) {}
 
 @Get('hizbs')
 getHizbs(){
    return this.quranService.getHizbs();
 }
 @Get('sorats/:hizb')
 getSorats(@Param('hizb') hizb:number){
    return this.quranService.getSorats(hizb);
 }

}
