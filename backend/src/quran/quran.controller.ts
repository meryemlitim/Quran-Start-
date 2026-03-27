import { Controller, Get, Param } from '@nestjs/common';
import { QuranService } from './quran.service';

@Controller('quran')
export class QuranController {
  constructor(private quranService: QuranService) {}

  @Get('hizbs')
  getHizbs() {
    return this.quranService.getHizbs();
  }
  @Get('sorats/:hizb')
  getSorats(@Param('hizb') hizb: number) {
    return this.quranService.getSorats(hizb);
  }
  @Get('ayats/:sorah')
  getAyats(@Param('sorah') sorah: number) {
    return this.quranService.getAyats(sorah);
  }
}
