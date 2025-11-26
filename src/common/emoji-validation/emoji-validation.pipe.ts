import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmojiValidationPipe implements PipeTransform {
  transform(value?: string | number) {
    if (!value) {
      return;
    }

    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      throw new BadRequestException(
        `Validation failed: ${value} is not number`,
      );
    }

    if (numberValue < 0 || numberValue > 2) {
      throw new BadRequestException(
        `Validation failed: ${value} is not within the range`,
      );
    }

    return numberValue;
  }
}
