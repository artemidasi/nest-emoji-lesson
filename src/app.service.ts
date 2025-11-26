import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getEmoji({ index }: { index?: number }) {
    const emojis = this.getEmojis();

    const randomIndex = index || Math.floor(Math.random() * emojis.length);

    return emojis[randomIndex];
  }

  getEmojis() {
    return ['a', 's', 'd'];
  }
}
