import { PipeTransform, BadRequestException } from '@nestjs/common';
import { SlotStatus } from '../slot-status.enum';

export class SlotStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    SlotStatus.OPEN,
    SlotStatus.BOOKED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
