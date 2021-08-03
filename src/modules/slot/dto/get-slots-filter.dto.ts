import { SlotStatus } from '../slot-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetSlotsFilterDto {
  @IsOptional()
  @IsIn([SlotStatus.OPEN, SlotStatus.BOOKED])
  status: SlotStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
