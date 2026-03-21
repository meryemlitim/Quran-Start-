import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class QuranService {
 async getHizbs() {
  const res = await fetch('https://api.qurani.ai/gw/qh/v1/hizb/metadata');
  const data = await res.json();

  const result: any[] = [];

  const hizbs = data.data.hizbs
    .map((h: any) => ({
      number: h.number,
      name: h.firstSurah.englishName
    }))
    .reverse()
    .slice(0, 6);

  for (const hizb of hizbs) {
    const hizbRes = await fetch(
      `https://api.qurani.ai/gw/qh/v1/hizb/${hizb.number}`
    );

    const hizbData = await hizbRes.json();

    const soratCount = hizbData.data.surahs.length;

    result.push({
      hizb: hizb.number,
      name: hizb.name,
      soratCount
    });
  }

  return result;
}

async getSorats(hizb:number) {
const data = await fetch(`https://api.qurani.ai/gw/qh/v1/hizb/${hizb}`);
const sorats =await data.json();
return sorats.data.surahs;

}

async getAyats(sorah:number){
const data = await fetch(`https://api.alquran.cloud/v1/surah/${sorah}`);
const ayats = await data.json();
return ayats.data.ayahs;
}
}
