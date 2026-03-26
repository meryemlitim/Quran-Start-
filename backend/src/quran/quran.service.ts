import { Injectable, NotFoundException } from '@nestjs/common';
import Hizbs from 'src/utils/hizbs-api';
import Surah from 'src/utils/surah-api';

@Injectable()
export class QuranService {
async getHizbs() {
  try {
    const res = await fetch('https://api.qurani.ai/gw/qh/v1/hizb/metadata');

    if (!res.ok) {
      throw new Error("API not responding");
    }

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

  } catch (error) {

    return Hizbs();

  }
}
async getSorats(hizb: number) {
const fallbackSorats = Surah()
  try {

    const res = await fetch(`https://api.qurani.ai/gw/qh/v1/hizb/${hizb}`);

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();

    return data.data.surahs;

  } catch (error) {

    return fallbackSorats[hizb] || [];

  }
}

async getAyats(sorah:number){
const data = await fetch(`https://api.alquran.cloud/v1/surah/${sorah}`);
const ayats = await data.json();
return ayats.data.ayahs;
}
}
